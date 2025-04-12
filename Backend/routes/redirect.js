const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const Click = require('../models/Click');
const useragent = require('useragent');
const requestIp = require('request-ip');

router.get('/:shortCode', async (req, res) => {
  const link = await Link.findOne({ shortCode: req.params.shortCode });
  if (!link) return res.sendStatus(404);

  link.clicks += 1;
  await link.save();

  const agent = useragent.parse(req.headers['user-agent']);
  const ip = requestIp.getClientIp(req);

  const click = new Click({
    linkId: link._id,
    ip,
    browser: agent.toAgent(),
    device: agent.device.toString()
  });
  click.save(); // async

  res.redirect(link.longUrl);
});

module.exports = router;
