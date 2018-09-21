'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../app/App.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolbarItem = function (_Component) {
  _inherits(ToolbarItem, _Component);

  function ToolbarItem() {
    _classCallCheck(this, ToolbarItem);

    return _possibleConstructorReturn(this, (ToolbarItem.__proto__ || Object.getPrototypeOf(ToolbarItem)).apply(this, arguments));
  }

  _createClass(ToolbarItem, [{
    key: 'render',
    value: function render() {
      if (this.props.item) {
        var _props$item = this.props.item,
            text = _props$item.text,
            items = _props$item.items,
            callback = _props$item.callback;
      } else var _props = this.props,
            text = _props.text,
            items = _props.items,
            callback = _props.callback;
      //pass one object that contains all props ;)

      if (items) {
        var listItems = items.map(function (item, index) {
          return _react2.default.createElement(
            'a',
            { onClick: item.callback, key: index },
            item.text
          );
        });

        var content = _react2.default.createElement(
          'div',
          { className: 'dropdown' },
          _react2.default.createElement(
            'a',
            null,
            text
          ),
          _react2.default.createElement(
            'div',
            { className: 'dropdown-content' },
            listItems
          )
        );
      } else {
        var content = _react2.default.createElement(
          'a',
          { onClick: callback },
          text
        );
      }
      return _react2.default.createElement(
        'li',
        null,
        content
      );
    }
  }]);

  return ToolbarItem;
}(_react.Component);

var Toolbar = function (_Component2) {
  _inherits(Toolbar, _Component2);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this2 = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this2.toggle = _this2.toggle.bind(_this2);
    _this2.state = {
      isOpen: false
    };
    return _this2;
  }

  _createClass(Toolbar, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      console.log("Single Click");
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var menu, items;

      if (this.props.menu) {
        menu = this.props.menu;
        items = menu.map(function (item, index) {
          return _react2.default.createElement(ToolbarItem, { text: item.text, items: item.items, callback: _this3.handleClick });
        });
      }

      var _props2 = this.props,
          brand = _props2.brand,
          url = _props2.url;

      var logo;
      if (this.props.logo) {
        logo = _react2.default.createElement('img', { src: this.props.logo, className: 'logo' });
      }

      return _react2.default.createElement(
        'div',
        { className: 'minimalist-toolbar' },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            { className: 'minimalist-toolbar-brand' },
            _react2.default.createElement(
              'div',
              null,
              logo,
              brand
            )
          ),
          items
        )
      );
    }
  }]);

  return Toolbar;
}(_react.Component);

exports.default = Toolbar;