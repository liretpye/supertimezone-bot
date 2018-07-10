"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * When anyone in a channel bot is invited to sends a messages with a time
 * string, this handler activates and posts another message with same
 * time in timezones of all users in the channel.
 */
var slack_1 = require("@xene/slack");
var moment = require("moment");
var token = process.env['TOKEN'];
var slack = new slack_1.Slackbot({ botToken: token }).listen();
/**
 * Matches time strings in free form text
 * 12.12am, 12:12am, 1 12am, 1.12 am, 1.02 am
 * 23:23, 23 23, 23.23
 * 12am, 12PM, 1PM, 1am
 */
var TIME_RX = /[1-9]\d?(([:. ]\d{2}([ ]?[a|p]m)?)|([ ]?[a|p]m))/i;
var hasTimeString = function (s) { return TIME_RX.test(s); };
var parseTime = function (s) { return s.match(TIME_RX)[0]; };
var clockEmoji = function (m) { return ":clock" + ((m.hours() % 12) || 12) + ":"; };
var normalizeTime = function (s) { return moment(s, 'h:mA').format('h:mm A'); };
var normalizeZone = function (o) { return moment().utcOffset(o).format('Z'); };
var userZone = function (id) { return slack.users.info(id).then(function (i) { return i.tzOffset / 60; }); };
var timeInZone = function (t, z) { return moment(t + " " + normalizeZone(z), 'h:mm A Z'); };
var slackTime = function (m) { return "<!date^" + m.unix() + "^{time} in your time zone|" + m.format('h:m A z') + ">"; };
slack.rtm.on('message', function (_a) {
    var text = _a.text, user = _a.user, channel = _a.channel;
    return __awaiter(_this, void 0, void 0, function () {
        var timeString, parsedTime, time, _a, _b, options;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!hasTimeString(text) || slack.bot.id === user)
                        return [2 /*return*/];
                    timeString = normalizeTime(parseTime(text));
                    parsedTime = moment(timeString, 'h:mm A');
                    if (!parsedTime.isValid())
                        return [2 /*return*/];
                    _a = timeInZone;
                    _b = [timeString];
                    return [4 /*yield*/, userZone(user)];
                case 1:
                    time = _a.apply(void 0, _b.concat([_c.sent()]));
                    options = { asUser: false, username: 'Your time', iconEmoji: clockEmoji(parsedTime) };
                    slack.chat.postMessage(channel, { text: "*" + timeString + "* is *" + slackTime(time.utc()) + "*." }, options);
                    return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsaUJBaUNBOztBQXRDQTs7OztHQUlHO0FBQ0gscUNBQXNDO0FBQ3RDLCtCQUFnQztBQUdoQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ2xDLElBQU0sS0FBSyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRXhEOzs7OztHQUtHO0FBQ0gsSUFBTSxPQUFPLEdBQUcsbURBQW1ELENBQUE7QUFFbkUsSUFBTSxhQUFhLEdBQUcsVUFBQyxDQUFTLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQTtBQUNwRCxJQUFNLFNBQVMsR0FBRyxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUE7QUFDcEQsSUFBTSxVQUFVLEdBQUcsVUFBQyxDQUFTLElBQUssT0FBQSxZQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBRyxFQUFsQyxDQUFrQyxDQUFBO0FBQ3BFLElBQU0sYUFBYSxHQUFHLFVBQUMsQ0FBUyxJQUFLLE9BQUEsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQWxDLENBQWtDLENBQUE7QUFDdkUsSUFBTSxhQUFhLEdBQUcsVUFBQyxDQUFTLElBQUssT0FBQSxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFqQyxDQUFpQyxDQUFBO0FBQ3RFLElBQU0sUUFBUSxHQUFHLFVBQUMsRUFBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQWYsQ0FBZSxDQUFDLEVBQS9DLENBQStDLENBQUE7QUFDaEYsSUFBTSxVQUFVLEdBQUcsVUFBQyxDQUFTLEVBQUUsQ0FBUyxJQUFLLE9BQUEsTUFBTSxDQUFJLENBQUMsU0FBSSxhQUFhLENBQUMsQ0FBQyxDQUFHLEVBQUUsVUFBVSxDQUFDLEVBQTlDLENBQThDLENBQUE7QUFDM0YsSUFBTSxTQUFTLEdBQUcsVUFBQyxDQUFTLElBQUssT0FBQSxZQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsa0NBQTZCLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQUcsRUFBckUsQ0FBcUUsQ0FBQTtBQUV0RyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBTyxFQUF1QjtRQUFyQixjQUFJLEVBQUUsY0FBSSxFQUFFLG9CQUFPOzs7Ozs7b0JBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQzt3QkFBQyxNQUFNLGdCQUFBO29CQUNuRCxVQUFVLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO29CQUMzQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtvQkFDL0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQUMsTUFBTSxnQkFBQTtvQkFDcEIsS0FBQSxVQUFVLENBQUE7MEJBQUMsVUFBVTtvQkFBRSxxQkFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUFsRCxJQUFJLEdBQUcsNEJBQXVCLFNBQW9CLEdBQUM7b0JBQ25ELE9BQU8sR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUE7b0JBQzNGLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFJLFVBQVUsY0FBUyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBOzs7OztDQUNyRyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdoZW4gYW55b25lIGluIGEgY2hhbm5lbCBib3QgaXMgaW52aXRlZCB0byBzZW5kcyBhIG1lc3NhZ2VzIHdpdGggYSB0aW1lXG4gKiBzdHJpbmcsIHRoaXMgaGFuZGxlciBhY3RpdmF0ZXMgYW5kIHBvc3RzIGFub3RoZXIgbWVzc2FnZSB3aXRoIHNhbWVcbiAqIHRpbWUgaW4gdGltZXpvbmVzIG9mIGFsbCB1c2VycyBpbiB0aGUgY2hhbm5lbC5cbiAqL1xuaW1wb3J0IHsgU2xhY2tib3QgfSBmcm9tICdAeGVuZS9zbGFjaydcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnXG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tICdtb21lbnQnXG5cbmNvbnN0IHRva2VuID0gcHJvY2Vzcy5lbnZbJ1RPS0VOJ11cbmNvbnN0IHNsYWNrID0gbmV3IFNsYWNrYm90KHsgYm90VG9rZW46IHRva2VuIH0pLmxpc3RlbigpXG5cbi8qKlxuICogTWF0Y2hlcyB0aW1lIHN0cmluZ3MgaW4gZnJlZSBmb3JtIHRleHRcbiAqIDEyLjEyYW0sIDEyOjEyYW0sIDEgMTJhbSwgMS4xMiBhbSwgMS4wMiBhbVxuICogMjM6MjMsIDIzIDIzLCAyMy4yM1xuICogMTJhbSwgMTJQTSwgMVBNLCAxYW1cbiAqL1xuY29uc3QgVElNRV9SWCA9IC9bMS05XVxcZD8oKFs6LiBdXFxkezJ9KFsgXT9bYXxwXW0pPyl8KFsgXT9bYXxwXW0pKS9pXG5cbmNvbnN0IGhhc1RpbWVTdHJpbmcgPSAoczogc3RyaW5nKSA9PiBUSU1FX1JYLnRlc3QocylcbmNvbnN0IHBhcnNlVGltZSA9IChzOiBzdHJpbmcpID0+IHMubWF0Y2goVElNRV9SWClbMF1cbmNvbnN0IGNsb2NrRW1vamkgPSAobTogTW9tZW50KSA9PiBgOmNsb2NrJHsobS5ob3VycygpICUgMTIpIHx8IDEyfTpgXG5jb25zdCBub3JtYWxpemVUaW1lID0gKHM6IHN0cmluZykgPT4gbW9tZW50KHMsICdoOm1BJykuZm9ybWF0KCdoOm1tIEEnKVxuY29uc3Qgbm9ybWFsaXplWm9uZSA9IChvOiBudW1iZXIpID0+IG1vbWVudCgpLnV0Y09mZnNldChvKS5mb3JtYXQoJ1onKVxuY29uc3QgdXNlclpvbmUgPSAoaWQ6IHN0cmluZykgPT4gc2xhY2sudXNlcnMuaW5mbyhpZCkudGhlbihpID0+IGkudHpPZmZzZXQgLyA2MClcbmNvbnN0IHRpbWVJblpvbmUgPSAodDogc3RyaW5nLCB6OiBudW1iZXIpID0+IG1vbWVudChgJHt0fSAke25vcm1hbGl6ZVpvbmUoeil9YCwgJ2g6bW0gQSBaJylcbmNvbnN0IHNsYWNrVGltZSA9IChtOiBNb21lbnQpID0+IGA8IWRhdGVeJHttLnVuaXgoKX1ee3RpbWV9IGluIHlvdXIgdGltZSB6b25lfCR7bS5mb3JtYXQoJ2g6bSBBIHonKX0+YFxuXG5zbGFjay5ydG0ub24oJ21lc3NhZ2UnLCBhc3luYyAoeyB0ZXh0LCB1c2VyLCBjaGFubmVsIH0pID0+IHtcbiAgaWYgKCFoYXNUaW1lU3RyaW5nKHRleHQpIHx8IHNsYWNrLmJvdC5pZCA9PT0gdXNlcikgcmV0dXJuXG4gIGNvbnN0IHRpbWVTdHJpbmcgPSBub3JtYWxpemVUaW1lKHBhcnNlVGltZSh0ZXh0KSlcbiAgY29uc3QgcGFyc2VkVGltZSA9IG1vbWVudCh0aW1lU3RyaW5nLCAnaDptbSBBJylcbiAgaWYgKCFwYXJzZWRUaW1lLmlzVmFsaWQoKSkgcmV0dXJuXG4gIGNvbnN0IHRpbWUgPSB0aW1lSW5ab25lKHRpbWVTdHJpbmcsIGF3YWl0IHVzZXJab25lKHVzZXIpKVxuICBjb25zdCBvcHRpb25zID0geyBhc1VzZXI6IGZhbHNlLCB1c2VybmFtZTogJ1lvdXIgdGltZScsIGljb25FbW9qaTogY2xvY2tFbW9qaShwYXJzZWRUaW1lKSB9XG4gIHNsYWNrLmNoYXQucG9zdE1lc3NhZ2UoY2hhbm5lbCwgeyB0ZXh0OiBgKiR7dGltZVN0cmluZ30qIGlzICoke3NsYWNrVGltZSh0aW1lLnV0YygpKX0qLmAgfSwgb3B0aW9ucylcbn0pXG4iXX0=