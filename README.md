# Blockcerts issuer helper

## Introduction

*blockcerts-issuer-helper* is a opensource JavaScript library for Node and the browser to create and issue [Blockcerts](https://www.blockcerts.org) certificates.

This library has been developed as the core component of a project with [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit) and [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization).

### What this library does

+ Easily create unsigned Blockcerts certificates (without displayHtml);
+ Easily create Blockcerts certificates batches and return the Merkle tree root that you just have to sign on your blockchain of choice afterwards, plus the list of the certificates with their Merkle proofs;
+ Easily insert the blockchain signature.

### What this library does not do

+ It does not sign the blockchain transaction for you, because this library is primarily designed for use in a client-side application in which issuers securely manage their Ethereum private keys with wallets like Metamask;
+ It does not create displayHtml;
+ It does not manage the images conversion to base64.

## Installation

````
yarn add blockcerts-issuer-helper
````

## How to use

TODO

## Issues

Please report issues [here](https://github.com/guix77/blockcerts-issuer-helper/issues).

## General discussion

Please post on the [Blockcerts.org forum topic](https://community.blockcerts.org/t/TODO).

## Development

Please read the [contribution guidelines](CONTRIBUTING.md).

## Credits

### Developers

+ Guillaume Duveau, freelance blockchain & web developer, original author of this [Blockcerts](https://guillaumeduveau.com/en/blockcerts) library

### Partners

+ [GIZ](https://www.giz.de/en/html/index.html) (Deutsche Gesellschaft für Internationale Zusammenarbeit)
+ [SEAMEO INNOTECH](https://www.seameo-innotech.org/) (Regional Center for Educational Innovation and Technology, Southeast Asian Ministers of Education Organization)
