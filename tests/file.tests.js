Tests.prototype.FileTests = function() {    
    module('FileReader model');
    test("should be able to define a FileReader object", function() {
        expect(1);
        var reader = new FileReader();
        ok(reader != null, "new FileReader() should not be null.");
    });
    test("should contain a readAsBinaryString function", function() {
        expect(2);
        var reader = new FileReader();
        ok(typeof reader.readAsBinaryString != 'undefined' && reader.readAsBinaryString != null, "reader.readAsBinaryString should not be null.");
        ok(typeof reader.readAsBinaryString == 'function', "reader.readAsBinaryString should be a function.");
    });
    test("should contain a readAsDataURL function", function() {
        expect(2);
        var reader = new FileReader();
        ok(typeof reader.readAsDataURL != 'undefined' && reader.readAsDataURL != null, "reader.readAsDataURL should not be null.");
        ok(typeof reader.readAsDataURL == 'function', "reader.readAsDataURL should be a function.");
    });
    test("should contain a readAsText function", function() {
        expect(2);
        var reader = new FileReader();
        ok(typeof reader.readAsText != 'undefined' && reader.readAsText != null, "reader.readAsText should not be null.");
        ok(typeof reader.readAsText == 'function', "reader.readAsText should be a function.");
    });
    test("should read file properly", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(1);
        
        // file name and content
        var filePath = FILE_ROOT+"read.txt";
        var rule = "There is an exception to every rule.  Except this one.";    
        
        // delete old file
        try { 
            navigator.fileMgr.deleteFile(filePath);
        }
        catch (e) {
            // ok if not found
        }

        // 2nd - read the file 
        var read = function(evt) {
            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("read success");
                console.log(evt.target.result);
                ok(evt.target.result === rule, "reader.result should be equal to the text written.");
                QUnit.start();
            };
            reader.readAsText(filePath);
        };
        
        // 1st - write the file to be read
        var writer = new FileWriter(filePath);
        writer.onwriteend = read; 
        writer.write(rule);
    });
    test("should contain a readAsArrayBuffer function", function() {
        expect(2);
        var reader = new FileReader();
        ok(typeof reader.readAsArrayBuffer != 'undefined' && reader.readAsArrayBuffer != null, "reader.readAsArrayBuffer should not be null.");
        ok(typeof reader.readAsArrayBuffer == 'function', "reader.readAsArrayBuffer should be a function.");
    });
    test("should contain an abort function", function() {
        expect(2);
        var reader = new FileReader();
        ok(typeof reader.abort != 'undefined' && reader.abort != null, "reader.abort should not be null.");
        ok(typeof reader.abort == 'function', "reader.abort should be a function.");
    });
    module('FileWriter model');    
    test("should be able to define a FileWriter object", function() {
        expect(1);
        var filePath=FILE_ROOT+"temp.txt";
        var writer = new FileWriter(filePath);
        ok(writer != null, "new FileWriter() should not be null.");
    });
    test("should contain a write function", function() {
        expect(2);
        var filePath=FILE_ROOT+"temp.txt";
        var writer = new FileWriter(filePath);
        ok(typeof writer.write != 'undefined' && writer.write != null, "writer.write should not be null.");
        ok(typeof writer.write == 'function', "writer.write should be a function.");
    });
    test("should be able to write and append to file", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(5);

        // file name and content
        var filePath = FILE_ROOT+"write.txt";
        var rule = "There is an exception to every rule.";
        var length = rule.length;

        // delete old file
        try { 
            navigator.fileMgr.deleteFile(filePath);
        }
        catch (e) {
            // ok if not found
        }
        
        // 3rd - append to file
        var append = function() {
            writer = new FileWriter(filePath, true);
            writer.onwriteend = function(evt) {
                ok(writer.length == length, "file length should be " + length);
                ok(writer.position == length, "position should be at " + length);
                QUnit.start();
            }
            var exception = "  Except this one.";
            length += exception.length;
            writer.write(exception); 
        };

        // 2nd - called when write completes
        var onwriteend = function(evt) {
            ok(navigator.fileMgr.testFileExists(filePath) == true, "file should exist");
            ok(writer.length == length, "should have written " + length + " bytes");
            ok(writer.position == length, "position should be at " + length);
            append();
        };
            
        // 1st - write to file
        var writer = new FileWriter(filePath);
        writer.onwriteend = onwriteend;
        writer.write(rule); 
    });
    test("should be able to write XML data", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(3);

        // file name and content
        var filePath = FILE_ROOT+"write.xml";
        var rule = '<?xml version="1.0" encoding="UTF-8"?>\n<test prop="ack">\nData\n</test>\n';
        var length = rule.length;

        // delete old file
        try { 
            navigator.fileMgr.deleteFile(filePath);
        }
        catch (e) {
            // ok if not found
        }
        
        // 2nd - called when write completes
        var onwriteend = function(evt) {
            ok(navigator.fileMgr.testFileExists(filePath) == true, "file should exist");
            ok(writer.length == length, "should have written " + length + " bytes");
            ok(writer.position == length, "position should be at " + length);
            QUnit.start();
        };
            
        // 1st - write to file
        var writer = new FileWriter(filePath);
        writer.onwriteend = onwriteend;
        writer.write(rule); 
    });
    test("should be able to write JSON data", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(3);

        // file name and content
        var filePath = FILE_ROOT+"write.json";
        var rule = '{ "name": "Guy Incognito", "email": "here@there.com" }';
        var length = rule.length;

        // delete old file
        try { 
            navigator.fileMgr.deleteFile(filePath);
        }
        catch (e) {
            // ok if not found
        }
        
        // 2nd - called when write completes
        var onwriteend = function(evt) {
            ok(navigator.fileMgr.testFileExists(filePath) == true, "file should exist");
            ok(writer.length == length, "should have written " + length + " bytes");
            ok(writer.position == length, "position should be at " + length);
            QUnit.start();
        };
            
        // 1st - write to file
        var writer = new FileWriter(filePath);
        writer.onwriteend = onwriteend;
        writer.write(rule); 
    });
    test("should contain a seek function", function() {
        expect(2);
        var filePath=FILE_ROOT+"temp.txt";
        var writer = new FileWriter(filePath);
        ok(typeof writer.seek != 'undefined' && writer.seek != null, "writer.seek should not be null.");
        ok(typeof writer.seek == 'function', "writer.seek should be a function.");
    });
    test("should be able to seek", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(5);
        
        // file name and content
        var filePath = FILE_ROOT+"seek.txt";
        var rule = "There is an exception to every rule.  Except this one.";
        var length = rule.length;
        
        // delete old file
        try { 
            navigator.fileMgr.deleteFile(filePath);
        }
        catch (e) {
            // ok if not found
        }
        
        // 2nd - seek through file
        var seek = function(evt) {
            ok(writer.position == length, "position should be at " + length); 
            writer.seek(-5);
            ok(writer.position == (length-5), "position should be at " + (length-5)); 
            writer.seek(100);
            ok(writer.position == length, "position should be at " + length); 
            writer.seek(10);
            ok(writer.position == 10, "position should be at 10"); 
            QUnit.start();
        };

        // 1st - write to file
        var writer = new FileWriter(filePath);
        writer.seek(-100);
        ok(writer.position == 0, "position should be at 0");        
        writer.onwriteend = seek;
        writer.write(rule);
    });
    test("should contain a truncate function", function() {
        expect(2);
        var filePath=FILE_ROOT+"temp.txt";
        var writer = new FileWriter(filePath);
        ok(typeof writer.truncate != 'undefined' && writer.truncate != null, "writer.truncate should not be null.");
        ok(typeof writer.truncate == 'function', "writer.truncate should be a function.");
    });
    test("should be able to truncate", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);
        
        // file name and content
        var filePath = FILE_ROOT+"truncate.txt";
        var rule = "There is an exception to every rule.  Except this one.";

        // delete old file
        try { 
            navigator.fileMgr.deleteFile(filePath);
        }
        catch (e) {
            // ok if not found
        }

        // 2nd - truncate the file
        var truncate = function() { 
            writer.onwriteend = function(evt) {
                ok(writer.length == 36, "file length should be 36");
                ok(writer.position == 36, "position should be at 36");  
                QUnit.start();
            }; 
            writer.truncate(36);
        };

        // 1st - write the file
        var writer = new FileWriter(filePath);
        writer.onwriteend = truncate;
        writer.write(rule);
    });
    test("should contain a abort function", function() {
        expect(2);
        var filePath=FILE_ROOT+"temp.txt";
        var writer = new FileWriter(filePath);
        ok(typeof writer.abort != 'undefined' && writer.abort != null, "writer.abort should not be null.");
        ok(typeof writer.abort == 'function', "writer.abort should be a function.");
    });    
    module('LocalFileSystem model');
    test("should contain a window.requestFileSystem function", function() {
        expect(2);
        ok(typeof window.requestFileSystem != 'undefined' && window.requestFileSystem != null, "window.requestFileSystem should not be null.");
        ok(typeof window.requestFileSystem == 'function', "window.requestFileSystem should be a function.");
    });
    test("should contain a window.resolveLocalFileSystemURI function", function() {
        expect(2);
        ok(typeof window.resolveLocalFileSystemURI != 'undefined' && window.resolveLocalFileSystemURI != null, "window.resolveLocalFileSystemURI should not be null.");
        ok(typeof window.resolveLocalFileSystemURI == 'function', "window.resolveLocalFileSystemURI should be a function.");
    });
    module('Metadata model');
    test("should be able to define a Metadata object", function() {
        expect(2);
        var metadata = new Metadata();
        ok(metadata != null, "new Metadata() should not be null.");
        ok(typeof metadata.modificationTime != 'undefined', "new Metadata() should include a 'modificationTime' property.");
    }); 
    module('Flags model');
    test("should be able to define a Metadata object", function() {
        expect(3);
        var flags = new Flags(false, true);
        ok(flags != null, "new Flags() should not be null.");
        ok(typeof flags.create != 'undefined' && flags.create != null && flags.create == false, "new Flags() should include a 'create' property.");
        ok(typeof flags.exclusive != 'undefined' && flags.exclusive != null && flags.exclusive == true, "new Flags() should include a 'exclusive' property.");
    }); 
    module('FileSystem model');
    test("request persistent file system", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(3);

        var testPersistent = function(fileSystem) {
            ok(fileSystem != null, "fileSystem should not be null.");
            ok(typeof fileSystem.name != 'undefined' && fileSystem.name != null && fileSystem.name == "persistent", "filesystem should include a 'name' property.");
            ok(typeof fileSystem.root != 'undefined' && fileSystem.root != null, "filesystem should include a 'root' property.");
            QUnit.start();
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, testPersistent, null);
    });
    test("request temporary file system", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(3);

        var testTemporary = function(fileSystem) {
            ok(fileSystem != null, "fileSystem should not be null.");
            ok(typeof fileSystem.name != 'undefined' && fileSystem.name != null && fileSystem.name == "temporary", "filesystem should include a 'name' property.");
            ok(typeof fileSystem.root != 'undefined' && fileSystem.root != null, "filesystem should include a 'root' property.");
            QUnit.start();
        };
        
        // Request the file system
        window.requestFileSystem(0, 0, testTemporary, null);
    });
    test("request a file system that is too large", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);

        var failFS = function(error) {
            ok(error != null, "error should not be null.");
            ok(typeof error.code != 'undefined' && error.code != null && error.code == FileError.QUOTA_EXCEEDED_ERR, "Shoud get an error code of FileError.QUOTA_EXCEEDED_ERR.");
            QUnit.start();
        };
        
        // Request the file system
        window.requestFileSystem(0, 1000000000000000, null, failFS);
    });
    test("request a file system that does not exist", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);

        var failFS = function(error) {
            ok(error != null, "error should not be null.");
            ok(typeof error.code != 'undefined' && error.code != null && error.code == FileError.SYNTAX_ERR, "Shoud get an error code of FileError.SYNTAX_ERR.");
            QUnit.start();
        };
        
        // Request the file system
        window.requestFileSystem(7, 0, null, failFS);
    });
    module("resolveLocalFileSystemURI tests");
    test("on invalid file name", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);

        var failURI = function(error) {
            ok(error != null, "error should not be null.");
            ok(typeof error.code != 'undefined' && error.code != null && error.code == FileError.NOT_FOUND_ERR, "Shoud get an error code of FileError.NOT_FOUND_ERR.");
            QUnit.start();
        };
        
        // Request the file system
        window.resolveLocalFileSystemURI("file:///this.is.not.a.valid.file.txt", null, failURI);
    });
    test("on invalid URL", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);

        var failURI = function(error) {
            ok(error != null, "error should not be null.");
            ok(typeof error.code != 'undefined' && error.code != null && error.code == FileError.ENCODING_ERR, "Shoud get an error code of FileError.ENCODING_ERR.");
            QUnit.start();
        };
        
        // Request the file system
        window.resolveLocalFileSystemURI("/this.is.not.a.valid.url", null, failURI);
    });
    test("on root directory", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(25);

        var testURI = function(entry) {
            ok(entry != null, "entry should not be null.");
            ok(typeof entry.isFile != 'undefined' && entry.isFile != null && entry.isFile == false, "entry should include a 'isFile' property.");
            ok(typeof entry.isDirectory != 'undefined' && entry.isDirectory != null && entry.isDirectory == true, "entry should include a 'isDirectory' property.");
            ok(typeof entry.name != 'undefined' && entry.name != null, "entry should include a 'name' property.");
            ok(typeof entry.fullPath != 'undefined' && entry.fullPath != null, "entry should include a 'fullPath' property.");
            ok(typeof entry.getMetadata != 'undefined' && entry.getMetadata != null, "entry.getMetadata should not be null.");
            ok(typeof entry.getMetadata == 'function', "entry.getMetadata should be a function.");
            ok(typeof entry.moveTo != 'undefined' && entry.moveTo != null, "entry.moveTo should not be null.");
            ok(typeof entry.moveTo == 'function', "entry.moveTo should be a function.");
            ok(typeof entry.copyTo != 'undefined' && entry.copyTo != null, "entry.copyTo should not be null.");
            ok(typeof entry.copyTo == 'function', "entry.copyTo should be a function.");
            ok(typeof entry.toURI != 'undefined' && entry.toURI != null, "entry.toURI should not be null.");
            ok(typeof entry.toURI == 'function', "entry.toURI should be a function.");
            ok(typeof entry.remove != 'undefined' && entry.remove != null, "entry.remove should not be null.");
            ok(typeof entry.remove == 'function', "entry.remove should be a function.");
            ok(typeof entry.getParent != 'undefined' && entry.getParent != null, "entry.getParent should not be null.");
            ok(typeof entry.getParent == 'function', "entry.getParent should be a function.");
            ok(typeof entry.createReader != 'undefined' && entry.createReader != null, "entry.createReader should not be null.");
            ok(typeof entry.createReader == 'function', "entry.createReader should be a function.");
            ok(typeof entry.getFile != 'undefined' && entry.getFile != null, "entry.getFile should not be null.");
            ok(typeof entry.getFile == 'function', "entry.getFile should be a function.");
            ok(typeof entry.getDirectory != 'undefined' && entry.getDirectory != null, "entry.getDirectory should not be null.");
            ok(typeof entry.getDirectory == 'function', "entry.getDirectory should be a function.");
            ok(typeof entry.removeRecursively != 'undefined' && entry.removeRecursively != null, "entry.removeRecursively should not be null.");
            ok(typeof entry.removeRecursively == 'function', "entry.removeRecursively should be a function.");
            QUnit.start();
        };
        
        window.resolveLocalFileSystemURI("file://" + FILE_ROOT, testURI, null);
    });
    test("on a file", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(21);
        
        var testURI = function(entry) {
            console.log("FULL PATH : " + entry.fullPath);
            console.log("FILE ROOT : " + FILE_ROOT);
            ok(entry != null, "entry should not be null.");
            ok(typeof entry.isFile != 'undefined' && entry.isFile != null && entry.isFile == true, "entry should include a 'isFile' property.");
            ok(typeof entry.isDirectory != 'undefined' && entry.isDirectory != null && entry.isDirectory == false, "entry should include a 'isDirectory' property.");
            ok(typeof entry.name != 'undefined' && entry.name != null && entry.name == "resolveURI.txt", "entry should include a 'name' property.");
            ok(typeof entry.fullPath != 'undefined' && entry.fullPath != null, "entry should include a 'fullPath' property.");
            ok(typeof entry.getMetadata != 'undefined' && entry.getMetadata != null, "entry.getMetadata should not be null.");
            ok(typeof entry.getMetadata == 'function', "entry.getMetadata should be a function.");
            ok(typeof entry.moveTo != 'undefined' && entry.moveTo != null, "entry.moveTo should not be null.");
            ok(typeof entry.moveTo == 'function', "entry.moveTo should be a function.");
            ok(typeof entry.copyTo != 'undefined' && entry.copyTo != null, "entry.copyTo should not be null.");
            ok(typeof entry.copyTo == 'function', "entry.copyTo should be a function.");
            ok(typeof entry.toURI != 'undefined' && entry.toURI != null, "entry.toURI should not be null.");
            ok(typeof entry.toURI == 'function', "entry.toURI should be a function.");
            ok(typeof entry.remove != 'undefined' && entry.remove != null, "entry.remove should not be null.");
            ok(typeof entry.remove == 'function', "entry.remove should be a function.");
            ok(typeof entry.getParent != 'undefined' && entry.getParent != null, "entry.getParent should not be null.");
            ok(typeof entry.getParent == 'function', "entry.getParent should be a function.");
            ok(typeof entry.createWriter != 'undefined' && entry.createWriter != null, "entry.createWriter should not be null.");
            ok(typeof entry.createWriter == 'function', "entry.createWriter should be a function.");
            ok(typeof entry.file != 'undefined' && entry.file != null, "entry.file should not be null.");
            ok(typeof entry.file == 'function', "entry.file should be a function.");
            QUnit.start();
        };
                
        // Request the file uri
        var checkFile = function(entry) {
            console.log("WE GOT TO THE CHECK FILE");
            window.resolveLocalFileSystemURI("file://" + FILE_ROOT + "/resolveURI.txt", testURI, null);         
        } 
        
        // Create the file if it does not exist.
        var getRootFS = function(fileSystem) {
            console.log("WE GOT TO THE ROOT FS");
            fileSystem.root.getFile("resolveURI.txt", {"create":true, "exclusive":false}, checkFile, null);
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, getRootFS, null);
    });
    module("Entry.getMetadata tests");
    test("on valid file name", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);
        
        var testMetadata = function(metadata) {
            ok(metadata != null, "metadata should not be null.");
            ok(typeof metadata.modificationTime != 'undefined' && metadata.modificationTime != null && metadata.modificationTime instanceof Date, "Shoud get a modificationTime.");
            QUnit.start();
        };

        var testGetFile = function(file) {
            file.getMetadata(testMetadata, null);
        };

        var testPersistent = function(fileSystem) {
            fileSystem.root.getFile("metadata.txt", {"create":true, "exclusive":false}, testGetFile, null);
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, testPersistent, null);
    });
    test("on valid directory name", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);
        
        var testMetadata = function(metadata) {
            ok(metadata != null, "metadata should not be null.");
            ok(typeof metadata.modificationTime != 'undefined' && metadata.modificationTime != null && metadata.modificationTime instanceof Date, "Shoud get a modificationTime.");
            QUnit.start();
        };

        var testGetDir = function(directory) {
            directory.getMetadata(testMetadata, null);
        };

        var testPersistent = function(fileSystem) {
            fileSystem.root.getDirectory("metadataDir", {"create":true, "exclusive":false}, testGetDir, null);
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, testPersistent, null);
    });
    module("Entry.getParent tests");
    test("on valid file name on the root of the FS", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);
        
        var rootFS = null;
        
        var testParent = function(directory) {
            ok(directory != null, "parent directory should not be null.");
            ok(rootFS.fullPath == directory.fullPath, "Root FS full path should be the same as getParent result");
            QUnit.start();
        };

        var testGetFile = function(file) {
            file.getParent(testParent, null);
        };

        var testPersistent = function(fileSystem) {
            rootFS = fileSystem.root;
            fileSystem.root.getFile("metadata.txt", {"create":true, "exclusive":false}, testGetFile, null);
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, testPersistent, null);
    });
    test("on valid directory name on the root of the FS", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);
        
        var rootFS = null;
        
        var testParent = function(directory) {
            ok(directory != null, "parent directory should not be null.");
            ok(rootFS.fullPath == directory.fullPath, "Root FS full path should be the same as getParent result");
            QUnit.start();
        };

        var testGetDir = function(directory) {
            directory.getParent(testParent, null);
        };

        var testPersistent = function(fileSystem) {
            rootFS = fileSystem.root;
            fileSystem.root.getDirectory("metadataDir", {"create":true, "exclusive":false}, testGetDir, null);
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, testPersistent, null);
    });
    test("on the root FS itself", function() {
        QUnit.stop(tests.TEST_TIMEOUT);
        expect(2);
        
        var rootFS = null;
        
        var testParent = function(directory) {
            ok(directory != null, "parent directory should not be null.");
            ok(rootFS.fullPath == directory.fullPath, "Root FS full path should be the same as getParent result");
            QUnit.start();
        };

        var testPersistent = function(fileSystem) {
            rootFS = fileSystem.root;
            fileSystem.root.getParent(testParent, null);
        };
        
        // Request the file system
        window.requestFileSystem(1, 0, testPersistent, null);
    });
};