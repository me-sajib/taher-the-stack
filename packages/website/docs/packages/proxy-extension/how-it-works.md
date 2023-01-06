---
title: How it works
sidebar_position: 3
---

Let's take a look at how you manage & connect your proxies through the extension.

## Open Extension 📭️

After uploading & pinned the extension it will render on clicking the extension icon

![Clicking the extension icon](../../../assets/24.open-proxy-manager-ext.png)

## Add local proxies 🆕

To add or open the extension dashboard, you have to press the ADD NEW button.

![Clicking the add new](../../../assets/25.add-lcoal-proxy.png)

Here is the extension dashboard, where all proxies will be managed

![Local proxy table](../../../assets/26.lcoal-proxy-table.png)

Adding one and multiple local proxies

![Adding proxy server inside the proxy](../../../assets/27.add-local-proxy-inside-table.png)

![Adding multiple local proxy](../../../assets/28.adding-proxy-inside-table.png)

:::note
The change will not happen if users don’t click the `Save` button after any changes
:::

> The popup saving the changes

![Before saving the changes](../../../assets/29.before-saving-local-proxies.png)

> Clicking the `Save` button

![Clicking the save button](../../../assets/30.clicking-the-save-button.png)

> The popup view after save changes

![Seeing the changes inside the popup](../../../assets/31.seeing-changes-inside-popup.png)

## Connect local proxy 🔌

Users can connect their proxy by clicking `connect` button. Lets try with [`https://httpbin.org/ip`](https://httpbin.org/ip) and see how it works.

![Connecting local proxy example 1](../../../assets/32.connect-proxy-example-1.png)

![Connecting local proxy example 2](../../../assets/33.connect-proxy-example.2.png)

## Log in to the proxy manager account 🏃🏻

Users can log in with their proxy manager dashboard credentials. Let's login with the previous credentials. After login, the proxy list is automatically fetched from the account. Under the hood, this is calling the **GET** `/api/proxy-list` API. All fetched proxy lists will appear in another table.

Furthermore, users can check their proxy list by pressing the `check` button. In order of priority, all proxies retrieved will appear at the top of the popup HTML.

![Login with api proxy manager credentials](../../../assets/34.including-account-credentials.png)

![fetched proxy list](../../../assets/35.fetched-proxy-list.png)
