# HCB Operations Plugin

This Chrome extension helps speed up HCB's operations work. It modifies various pages on HCB and other 3rd party websites (Expensify, SVB, etc.) to simplify workflows.

Anything surrounded by a dark orange dotted line is added to the page by this plugin. Example:

![image](https://user-images.githubusercontent.com/20099646/112124023-23a42700-8b7f-11eb-9538-d5921f24bc7e.png)

<br />

## Features

### Expensify

- Link to Expensify policy's respective project on HCB
  ![image](https://user-images.githubusercontent.com/20099646/112122184-403f5f80-8b7d-11eb-88a6-6aeabc5f8512.png)

### SVB

- Automatically select "I have the bank account information" when creating a new individual payee
- Automatically request activation code to be sent to mobile when verifying a payee

### HCB

- [Feature moved into the Bank repo]. Add a button for copying the event's name (visible on all event specific pages)
  ![image](https://user-images.githubusercontent.com/20099646/112122844-ea1eec00-8b7d-11eb-9dc0-95a87d3ad796.png)

- Easily grab the Google Webmaster Domain Verification key for Google Workspace (v1 and v2).<br />
  This pings [G-Verify](https://github.com/garyhtou/G-Verify) to generate the key on behalf of gary@hackclub.com<br />
  ![image](https://user-images.githubusercontent.com/20099646/112123328-66b1ca80-8b7e-11eb-8048-fa62d9e8bf8c.png)

- Automatically attempt to verify all domains in `VERIFYING` status.<br />
  This pings [G-Verify](https://github.com/garyhtou/G-Verify) to attempt verification on behalf of gary@hackclub.com<br />
  ![image](https://user-images.githubusercontent.com/20099646/112127676-e93c8900-8b82-11eb-9992-998747ae2142.png)

- When mapping transactions, if the transaction is an Expensify report, it'll provide the report link.
  ![image](https://user-images.githubusercontent.com/20099646/112128126-55b78800-8b83-11eb-96a4-797b1fab8d70.png)

## Get started (Development)

1. Clone this repository
   `git clone https://github.com/hackclub/bank-ops-plugin`
2. `cd bank-ops-plugin`
3. `npm install`
4. `npx webpack -w`
5. The unpacked Chrome extension will be compiled into `dist/`. You can load it into Chrome by enabling developer mode on the "Extensions" page, hitting "Load unpacked", and selecting the `dist/` folder. After an edit, you will need to reload the chrome extension by clicking the icon next to the extension's on/off switch.

---

[TypeScript / React / Webpack / Chrome Extention Boilerplate](https://github.com/duo-labs/chrome-extension-boilerplate) by Duo Labs
