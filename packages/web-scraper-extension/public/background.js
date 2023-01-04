const scriptPath = '<%main-js-path%>'; // this will be replace by post build
// this is background state
const state = {
  limit: 0,
  totalScraped: 0,
  dashboardTab: null,
  extensionTab: null,
  startTime: null,
  decriesLimit() {
    this.limit--;
  }
};

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true
    }
  );

  return tab;
}

async function createNewTab(
  url,
  index
) {
  const newTab =
    await chrome.tabs.create({
      url,
      index:
        index ??
        state.extensionTab.index + 1,
      active: true
    });

  return [
    newTab,
    await getCurrentTab()
  ];
}

// run the easy scraper extension on click icon
chrome.action.onClicked.addListener(
  async (tab) => {
    await chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: [scriptPath]
      }
    );

    chrome.tabs.sendMessage(
      tab.id,
      { type: 'RUN-EASY-SCRAPER' },
      console.log
    );
  }
);

const viewResult = async (payload) => {
  state.extensionTab =
    await getCurrentTab();

  return payload.paginate.limit
    ? runPagination(payload)
    : openDashboard(payload);
};

chrome.runtime.onMessage.addListener(
  ({ type, payload }) => {
    switch (type) {
      case 'VIEW_RESULT':
        return viewResult(payload);
      case 'RUN_RECIPE':
        return runPagination(
          payload,
          true
        );
    }
  }
);

// this function run all the pagination execution process
async function runPagination(
  payload,
  isRecipePagination
) {
  const {
    paginate,
    url,
    resultSchema
  } = payload;
  const [paginateTab] =
    await createNewTab(
      url,
      isRecipePagination
        ? state.dashboardTab.index + 1
        : null
    );

  state.startTime = Date.now();
  state.limit = paginate.limit;

  const paginateHandler = (
    tabId,
    info
  ) => {
    if (
      tabId === paginateTab.id &&
      info.status === 'complete' &&
      state.limit
    ) {
      state.decriesLimit();

      const injectionConfig = {
        target: {
          tabId: paginateTab.id
        },
        func: pageScraper,
        args: [
          JSON.stringify({
            paginate,
            resultSchema,
            totalScraped: 0
          })
        ]
      };

      const saveResultHandler = async ([
        { result }
      ]) => {
        const [results, totalScraped] =
          result;
        payload.results.push(
          ...results
        );

        state.totalScraped +=
          totalScraped;

        if (state.limit === 0) {
          payload.totalScraped =
            state.totalScraped;
          state.totalScraped = 0;
          payload.startTime =
            state.startTime;
          state.startTime = null;

          if (isRecipePagination) {
            await chrome.runtime.sendMessage(
              {
                type: 'OPEN_RECIPE_RESULT',
                payload
              }
            );
            completeScrapeNotifier(
              state.dashboardTab.id
            );

            await chrome.tabs.update(
              state.dashboardTab.id,
              { active: true }
            );
            chrome.tabs.remove(
              paginateTab.id
            );
          } else {
            openDashboard(
              payload,
              paginateTab.index + 1
            );
          }
        }
      };

      setTimeout(
        () =>
          chrome.scripting.executeScript(
            injectionConfig,
            saveResultHandler
          ),
        paginate.delay * 1e3
      );
    }
  };

  chrome.tabs.onUpdated.addListener(
    paginateHandler
  );
}

// this function send scrape complete message
function completeScrapeNotifier(tabId) {
  chrome.tabs.sendMessage(
    tabId ?? state.extensionTab.id,
    {
      type: 'SCRAPE_COMPLETE'
    },
    console.log
  );
}

// It will open a dash board via based on given payload
async function openDashboard(
  payload,
  openIndex
) {
  completeScrapeNotifier();
  // remove previous dashboard if exist
  if (state.dashboardTab) {
    await chrome.tabs.remove(
      state.dashboardTab.id
    );
  }
  // create a new dashboard tab
  const [dashboardTab] =
    await createNewTab(
      chrome.runtime.getURL(
        'index.html'
      ),
      state.extensionTab?.index + 1 ||
        openIndex
    );
  chrome.tabs.onUpdated.addListener(
    (tabId, { status }) => {
      if (
        tabId === dashboardTab.id &&
        status === 'complete'
      ) {
        if (
          state.dashboardTab !==
          dashboardTab
        ) {
          chrome.tabs.sendMessage(
            dashboardTab.id,
            {
              type: 'OPEN_DASHBOARD',
              payload
            },
            (res) => {
              console.log(res);
              state.dashboardTab =
                dashboardTab;
            }
          );
        }
      }
    }
  );

  chrome.tabs.onRemoved.addListener(
    (tabId) => {
      if (
        state.dashboardTab?.id === tabId
      ) {
        state.dashboardTab = null;
      }

      if (
        state.extensionTab?.id === tabId
      ) {
        state.extensionTab = null;
      }
    }
  );

  return payload;
}

/**
 * this function paginate all pages based on the limit state
 * this function will run in the browser context
 */
function pageScraper(payload) {
  let {
    paginate,
    resultSchema,
    totalScraped
  } = JSON.parse(payload);

  const scrapeElement = (element) => {
    if (!element) {
      return '';
    }

    const data = {
      text:
        element instanceof HTMLElement
          ? element.innerText
          : '',
      link:
        element instanceof
        HTMLAnchorElement
          ? element.href
          : '',
      src:
        element instanceof
        HTMLImageElement
          ? element.src
          : ''
    };
    const dataValues =
      Object.values(data);
    const isMultiValue =
      dataValues.filter(Boolean)
        .length > 1;

    if (isMultiValue) {
      // filtering the empty result
      return Object.entries(
        data
      ).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      }, {});
    }

    return (
      dataValues.find(Boolean) ?? ''
    );
  };

  const resultScraper = (
    resultSchema
  ) => {
    const scrapeElementReducer = (
      map,
      [propertyName, suggestSelector]
    ) => {
      let allElements = [];

      if (suggestSelector.length > 1) {
        suggestSelector.forEach(
          (selector, index) => {
            allElements = [
              ...document.querySelectorAll(
                selector
              )
            ].reverse();

            map.set(
              `${propertyName}_COLLECTION-${
                index + 1
              }`,
              allElements
            );
          }
        );
      } else {
        allElements = [
          ...document.querySelectorAll(
            suggestSelector.at()
          )
        ].reverse();
        map.set(
          propertyName,
          allElements.reverse()
        );
      }

      totalScraped +=
        allElements.length;

      return map;
    };

    const resultElements =
      Object.entries(
        resultSchema
      ).reduce(
        scrapeElementReducer,
        new Map()
      );

    const results = [];

    // this function will check is any element exist in the element Map or not
    const isEmptyElements = () =>
      [...resultElements.values()].some(
        (elements) => elements.length
      );

    while (isEmptyElements()) {
      // generate the result scuff holder
      const result = {};

      for (const [
        propertyName,
        elements
      ] of resultElements) {
        result[propertyName] =
          scrapeElement(elements.pop());
      }

      results.push(result);
    }

    return results;
  };

  const results = resultScraper(
    resultSchema
  );
  const paginateButton =
    document.querySelector(
      paginate.selector || null
    );
  paginateButton?.click();

  return [results, totalScraped];
}
