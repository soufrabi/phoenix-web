
const invidious = {
    instanceFallbackList: ["yt.artemislena.eu", "vid.puffian.us", "invidious.projectsegfau.lt", "y.com.sb", "invidious.tiekoetter.com", "invidious.slipfox.xyz", "invidious.privacydev.net", "vid.priv.au", "iv.melmac.space", "iv.ggtyler.dev", "invidious.lunar.icu", "invidious.0011.lt", "inv.zzls.xyz", "yt.floss.media", "inv.tux.pizza", "not-ytp.blocus.ch", "invidious.protokolla.fi", "onion.tube", "inv.in.projectsegfau.lt", "inv.citw.lgbt", "inv.makerlab.tech", "yt.oelrichsgarcia.de", "yewtu.be"]

}

let currentInvidiousInstance = invidious.instanceFallbackList[0]

export default invidious

export {currentInvidiousInstance}
