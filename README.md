wak-qrencode
============

Important Notice
---
The original version is now in branch "standard-qrencode".

This main branch uses a special [waqrencode](https://github.com/miyako/console-qrencode) program.

Install
-------
Please read [install](https://github.com/miyako/wak-ftp/blob/master/install.md).

Example
-------
```
var modulesFolder = FileSystemSync('Modules');
var qrencode = require(modulesFolder.path + 'qrencode');
var desktopPath = FileSystemSync('Desktop').path;

var qr, bs;

var url = 'http://www.wakanda.org/';
var type = 'png';//or 'svg'
var dpi = 96;//default = 72
var margin = 0;
var size = 5;//of rects
var version = 1;//1->40 for qr, 1->4 for micro qr

qr = qrencode.qrencode(url, type, dpi, margin, size, version).console.stdOut.toBlob('image/png');
bs = BinaryStream(desktopPath + 'test.png', 'write');
bs.putBlob(qr);
bs.close();

qr = qrencode.qrencode(url, 'svg', dpi, margin, size, version).console.stdOut.toBlob('image/svg+xml');
bs = BinaryStream(desktopPath + 'test.svg', 'write');
bs.putBlob(qr);
bs.close();

//Micro QR
qr = qrencode.mqrencode('12345', type, dpi, margin, size, 4).console.stdOut.toBlob('image/png');
bs = BinaryStream(desktopPath + 'test-micro.png', 'write');
bs.putBlob(qr);
bs.close();

qr = qrencode.mqrencode('12345', 'svg', dpi, margin, size, 4).console.stdOut.toBlob('image/svg+xml');
bs = BinaryStream(desktopPath + 'test-micro.svg', 'write');
bs.putBlob(qr);
bs.close();
```
Demo
---
Open index.html in your browser.

![](https://github.com/miyako/wak-qrencode/blob/master/images/1.png)
