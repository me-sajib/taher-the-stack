import {
  DETECTOR_ATTR_NAME,
  SCRAPE_ATTRIBUTE_NAME
} from './global';
import type {
  StyleSchema,
  StyleSheet
} from './interfaces/extension';

const root = {
  '--primary-color': 'hsl(0, 0%, 95%)',
  '--secondary-color':
    'hsla(224, 81%, 61%, 0.851)',
  '--input-border-color':
    'hsla(60, 4%, 89%, 0.89)',
  '--success-color':
    'hsl(144, 45%, 62%)',
  '--danger-color':
    'hsla(6, 78%, 57%, 0.872)',

  '  --shadow':
    'hsla(0, 0%, 0%, 0.3) 0px 1.3px 3.3px 0px'
};

const componentStyle: StyleSheet = {
  button: [
    {
      selector: '.scrape-button',
      styles: {
        whiteSpace: 'nowrap',
        padding: '10px 12px',
        cursor: 'pointer'
      }
    }
  ],
  propWrapper: [
    {
      selector: '.wrapper',
      styles: {
        position: 'relative',
        borderRadius: '50%',

        marginLeft: '5.5px',
        cursor: 'pointer',
        width: '40.5px',
        height: '40.5px',
        display: 'grid',
        placeItems: 'center'
      }
    },
    {
      selector: '.bounce',
      styles: {
        animation:
          'bounce 200ms ease-in'
      }
    },
    {
      selector: '.prop-name',
      styles: {
        color: '#000',
        fontSize: ' 15px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
      }
    },
    {
      selector: '.selected-prop-name',
      styles: {
        outlineWidth: '2px',
        outlineStyle: 'solid'
      }
    },
    {
      selector: '.edit-input',
      styles: {
        fontSize: ' 18px',
        fontWeight: 'bold'
      }
    },
    {
      selector: '.scrape-result',
      styles: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        backgroundColor: '#fff',
        borderRadius: '10px',
        color: 'var(--secondary-color)',
        boxShadow: 'var(--shadow)',
        padding: '3px',
        fontSize: '10px',
        fontWeight: 'bold',
        transform: 'translate(-2px,8px)'
      }
    },
    {
      selector: '.delete-action',
      styles: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '1.56px',
        backgroundColor:
          'rgba(255, 255, 255, 0.742)',
        borderRadius: '50%',
        boxShadow: 'var(--shadow)',
        marginLeft: '0px',
        transform:
          'translate(3px, -5px)'
      }
    },
    {
      selector:
        '.delete-action:hover > *',
      styles: {
        color: 'var(--danger-color)'
      }
    },
    {
      selector: '.edit-action',
      styles: {
        position: 'absolute',
        bottom: '0',
        right: '0',
        padding: '1.56px',
        backgroundColor:
          'rgba(255, 255, 255, 0.742)',
        borderRadius: '50%',
        boxShadow: 'var(--shadow)',
        marginLeft: '0px',
        transform: 'translate(3px, 5px)'
      }
    },
    {
      selector:
        '.edit-action:hover > *',
      styles: {
        color: 'var(--secondary-color)'
      }
    },
    {
      selector:
        '.delete-action > *, .edit-action > *',
      styles: {
        fontSize: '13.5px'
      }
    }
  ],
  scrapeInput: [
    {
      selector: '.prop-name-input',
      styles: {
        marginRight: '15px',
        borderBottomWidth: '1.23px',
        borderBottomStyle: 'solid',
        borderBottomColor:
          'var(--input-border-color)',
        fontSize: '18px',
        padding: '5px',
        transition:
          'border-bottom-color 250ms ease'
      }
    },
    {
      selector:
        '.prop-name-input:focus',
      styles: {
        borderBottomColor:
          'var(--secondary-color)'
      }
    },
    {
      selector: '.pagination-input',
      styles: {
        maxWidth: '80px',
        outline:
          '2.5px solid var(--secondary-color)',
        borderRadius: '5px',
        padding: '5px',
        fontSize: '17px'
      }
    },
    {
      selector:
        '.pagination-input-container',
      styles: {
        margin: '12.5px 0px',
        position: 'relative'
      }
    },
    {
      selector: '.label-after',
      styles: {
        marginLeft: '5px',
        fontSize: '12px',
        position: 'absolute',
        top: '0',
        left: '0',
        marginTop: '-.7em',
        color: 'black',
        background:
          'var(--primary-color)'
      }
    }
  ]
};

const globalCSS: StyleSheet = {
  root: [
    {
      selector:
        '*, *::before, *::after',
      styles: {
        margin: '0',
        padding: '0',
        boxSizing: 'border-box'
      }
    }
  ],
  app: [
    {
      selector: ':host',
      styles: {
        ...root,

        position: 'relative',
        width: '100%',
        fontFamily:
          'Roboto, sans-serif',
        lineHeight: 'normal'
      }
    },
    {
      selector: '.App',
      styles: {
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '99999999999',
        width: '100%',

        boxShadow:
          'hsla(0, 0%, 0%, 0.15) 0px 3px 3px 0px',
        marginBottom: '10px',
        backgroundColor:
          'var(--primary-color)'
      }
    },
    {
      selector: '.suggested-selector',
      styles: {
        marginLeft: '20px',
        paddingBottom: '5px',
        fontSize: '12px',
        textAlign: 'left',
        overflowX: 'auto',
        color: 'black'
      }
    },
    {
      selector: '.scraper-bar',
      styles: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    },
    {
      selector: 'input',
      styles: {
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent'
      }
    },
    {
      selector: 'button',
      styles: {
        background: 'transparent',
        border: 'none'
      }
    },
    {
      selector: 'button:focus',
      styles: {
        outline: 'none'
      }
    },
    {
      selector: '.selector-inputs',
      styles: {
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'hidden',
        padding: '15px 20px'
      }
    },
    {
      selector: '.selector-buttons',
      styles: {
        display: 'flex'
      }
    },
    {
      selector:
        '.selector-buttons > * ~ *',
      styles: {
        marginLeft: '15px'
      }
    },
    {
      selector: '.icon',
      styles: {
        fontSize: '25px',
        transition:
          'transform 350ms ease'
      }
    },
    {
      selector: '.scraper-button',
      styles: {
        fontSize: '10px',
        borderRadius: '50%',
        width: '39.5px',
        height: '39.5px',
        padding: '0px !important',
        boxShadow:
          '0 0 1px 0.5px hsla(0, 0%, 0%, 0.164)',
        backgroundColor:
          'var(--input-border-color)'
      }
    },
    {
      selector:
        '.scraper-button:hover > :is(.add-scrap-button, .done-scrap-button)',
      styles: {
        color: 'var(--success-color)'
      }
    },
    {
      selector: '.exit-scrap-button',
      styles: {
        transform: 'rotate(45deg)'
      }
    },
    {
      selector:
        '.scraper-button:hover > :is(.exit-scrap-button, .clear-scraper-button)',
      styles: {
        color: 'var(--danger-color)'
      }
    },
    {
      selector:
        '.scrape-button:hover .undo-button',
      styles: {
        color: 'var(--success-color)'
      }
    },
    {
      selector: '.result-options',
      styles: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }
    },
    {
      selector:
        '.result-options > *:not(:first-child)',
      styles: {
        marginLeft: '10px'
      }
    },
    {
      selector: '.result-button',
      styles: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
        backgroundColor:
          'hsl(50, 6%, 82%)',
        color: 'hsla(0, 0%, 0%, 0.8)',
        borderRadius: '3px',
        marginTop: '5px',
        marginBottom: '5px'
      }
    },
    {
      selector: '.result-ready',
      styles: {
        backgroundColor:
          'var(--success-color)',
        color: 'hsla(0, 0%, 100%, 0.9)',
        transition:
          'box-shadow 150ms ease-in'
      }
    },
    {
      selector: '.result-ready:hover',
      styles: {
        boxShadow:
          '0.003px 0.003px 5px #518f6a, -0.003px -0.003px 5px #93ffc0'
      }
    },
    {
      selector: '.option-button:hover',
      styles: {
        backgroundColor:
          'var(--input-border-color)',
        borderRadius: '15px'
      }
    },
    {
      selector: '.option-button .icon',
      styles: {
        fontSize: '40px',
        color: 'hsla(0, 1%, 31%, 0.927)'
      }
    },
    {
      selector: '.save-scrap-button',
      styles: {
        padding: '2px'
      }
    },
    {
      selector:
        '.pagination-active > *',
      styles: {
        color:
          'var(--secondary-color) !important'
      }
    },
    {
      selector: '.pagination-done > *',
      styles: {
        color:
          'var(--success-color) !important'
      }
    }
  ]
};

export const detectionStyles: StyleSchema[] =
  [
    {
      attr: {
        name: DETECTOR_ATTR_NAME,
        value: 'detected'
      },
      styles: {
        cursor: 'default !important',
        transition:
          'all 100ms ease-in !important',
        userSelect: 'none !important',
        color: '#000 !important',
        outline: 'none'
      }
    },
    {
      attr: {
        name: SCRAPE_ATTRIBUTE_NAME,
        value: 'suggested'
      },
      styles: {
        borderRadius:
          '0.3px !important',
        color: '#000 !important',
        outlineWidth:
          '3.5px !important',
        outlineStyle:
          'solid !important',
        transition:
          'all 350ms cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      }
    },
    {
      attr: {
        name: SCRAPE_ATTRIBUTE_NAME,
        value: 'selected'
      },
      styles: {
        borderRadius:
          '0.3px !important',
        color: '#000 !important',
        outlineWidth:
          '3.5px !important',
        outlineStyle: 'solid !important'
      }
    },
    {
      attr: {
        name: SCRAPE_ATTRIBUTE_NAME,
        value: 'rejected'
      },
      styles: {
        backgroundColor:
          '#F15412 !important',
        borderRadius:
          '2.5px !important',
        color: '#fff !important'
      }
    },
    {
      attr: {
        name: SCRAPE_ATTRIBUTE_NAME,
        value: 'paginated'
      },
      styles: {
        borderRadius:
          '2.5px !important',
        color: '#fff !important'
      }
    }
  ];

export default [
  ...Object.values(globalCSS),
  ...Object.values(componentStyle)
].flat();
