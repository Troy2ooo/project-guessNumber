"use strict";
/**
 *
 * @param req
 * @param res
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getHello'.
function getHello(req, res) {
    res.send('Hello World');
}
;
// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getHello = getHello;
