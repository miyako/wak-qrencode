﻿var DIRECTORY_PATH = File(module.filename).parent.path;var os = application.os;var isMac = os.isMac;var isWindows = os.isWindows;var isLinux = os.isLinux;var EXECUTABLE_PATH = (function(){	if(isMac){		return DIRECTORY_PATH + 'MacOS/qrencode';	}	if(isLinux){		return DIRECTORY_PATH + 'Linux64/qrencode';	}	if(isWindows){		return DIRECTORY_PATH + 'Windows64/qrencode.exe';	}})();//exports.executablePath = EXECUTABLE_PATH;var execute = function(path, command, stdIn){	var result = {		'console':{			'stdIn':'',			'stdOut':null,				'stdErr':''},		'worker':{			'hasStarted':false,			'exitStatus':null,			'forced':null}	};		if((/^\S/).test(command)){		path += ' ';	}	result.console.stdIn = path + command;	var worker = new SystemWorker(result.console.stdIn);	worker.setBinary(true);			worker.onmessage = function(e){		if(!result.console.stdOut){			result.console.stdOut = new Buffer(e.data.length);			e.data.copy(result.console.stdOut);		}else{			var temp = new Buffer(result.console.stdOut.length + e.data.length);			result.console.stdOut.copy(temp);			e.data.copy(temp, result.console.stdOut.length);			result.console.stdOut = temp.slice(0);		}	}	worker.onerror = function(e){		try{			result.console.stdErr += e.data.toString('utf8');		}catch(e){		for(var i = 0;i < e.messages.length;++i){			console.error('%s', e.messages[i]);					}		}	}	worker.onterminated = function(e){		result.worker.hasStarted = e.hasStarted;		result.worker.exitStatus = e.exitStatus;		result.worker.forced = e.forced;					exitWait();	}	if(typeof stdIn === 'string' || stdIn instanceof Buffer){		worker.postMessage(stdIn);		worker.endOfInput();	}				worker.wait();		return result;}var escapePath = function(path){	if(typeof path === 'string'){		if(isMac || isLinux){			return path.replace(/([\\!"#$%&\'()=~|<>?;*`\[\] ])/g, '\\$1');		}			if(isWindows){			if((/[&|<>()%\^\\" ]/).test(path)){								if((/\\$/).test(path)){					path = '"' + path + '\\"';				}else{					path = '"' + path + '"';				}			}			return path;		}	}}exports.qrencode = function(command, stdIn){	if(typeof command === 'string'){		return execute(escapePath(EXECUTABLE_PATH), command, stdIn);		}}