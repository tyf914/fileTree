/**
 * Created by yifei.tang on 2017/10/01.
 */
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//fd为fs.open的返回值，file为目录下历次遍历的文件/目录，num为缩进次数计数器
var preCalc = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fd, file, num) {
        var str, parentFile, dirFiles, i, stats, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _file;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        str = '';

                        //存入当前传入的目录名

                        parentFile = file;

                        num++;

                        dirFiles = [];

                        //计算当前空格数量

                        for (i = 0; i < num * 3; i++) {
                            str += ' ';
                        }

                        //判断file是文件还是目录
                        stats = fs.statSync(file, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });

                        if (!stats.isDirectory()) {
                            _context.next = 37;
                            break;
                        }

                        fs.writeFileSync(fd, str + '+---' + file.split('/').slice(-1).toString() + '\n', { flag: 'a' }, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                        files = fs.readdirSync(file, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 12;
                        _iterator = (0, _getIterator3.default)(files);

                    case 14:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 21;
                            break;
                        }

                        _file = _step.value;
                        _context.next = 18;
                        return preCalc(fd, parentFile + '/' + _file, num);

                    case 18:
                        _iteratorNormalCompletion = true;
                        _context.next = 14;
                        break;

                    case 21:
                        _context.next = 27;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context['catch'](12);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 27:
                        _context.prev = 27;
                        _context.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 30:
                        _context.prev = 30;

                        if (!_didIteratorError) {
                            _context.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return _context.finish(30);

                    case 34:
                        return _context.finish(27);

                    case 35:
                        _context.next = 38;
                        break;

                    case 37:
                        if (stats.isFile()) {
                            fs.writeFileSync(fd, str + '|---' + file.split('/').slice(-1).toString() + '\n', { flag: 'a' }, function (err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            });
                        }

                    case 38:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[12, 23, 27, 35], [28,, 30, 34]]);
    }));

    return function preCalc(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

fs.readdir(process.cwd(), function (err, files) {
    if (err) {
        console.log(err);
        return;
    }

    fs.open('output.txt', 'w', function (err, fd) {
        if (err) {
            console.log(err);
            return;
        }

        //追加模式写入文件名
        fs.writeFileSync(fd, '   ' + process.cwd() + '\n   |\n', { flag: 'a' }, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });

        for (var file in files) {
            preCalc(fd, files[file], 0);
        }
    });
});
//# sourceMappingURL=index.js.map