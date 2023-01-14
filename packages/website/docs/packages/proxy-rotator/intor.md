---
title: Intro
sidebar_position: 1
---

This sub-application is specifically designed to retrieve proxies in a rotational sequence, ensuring that users can smoothly navigate the internet without being detected. These proxies, which are sourced from a comprehensive proxy list, can be accessed using a designated username and password. Additionally, this sub-app is connected to the proxy-api database, allowing for efficient management of the rotating proxies. This helps users maintain a secure and anonymous connection to the internet at all times.

To use a rotating proxy through curl

```bash
curl -x http://username:password@localhost:port http://httpbin.org/ip
```
