export default function mixpanelMiddleware(mixpanel) {
  if (!mixpanel || !mixpanel.track) {
    throw new TypeError('You must provide a mixpanel client instance.')
  }

  return (store) => (next) => (action) => {
    if (!action.meta || !action.meta.mixpanel || !action.meta.mixpanel.event) {
      return next(action)
    }

    try {
      const { event, type, props } = action.meta.mixpanel
      switch (type) {
            case 'track': {
              mixpanel.track(event);
              break;
            }
            case 'trackWithProperties': {
              mixpanel.trackWithProperties(event, props);
              break;
            }
            case 'set': {
              mixpanel.set(props);
              break;
            }
            case 'setOnce': {
              mixpanel.setOnce(props);
              break;
            }
            case 'timeEvent': {
              mixpanel.timeEvent(event);
              break;
            }
            case 'registerSuperProperties': {
              mixpanel.registerSuperProperties(props);
              break;
            }
            case 'registerSuperPropertiesOnce': {
              mixpanel.registerSuperPropertiesOnce(props);
              break;
            }
            case 'trackCharge': {
              mixpanel.trackCharge(event, props);
              break;
            }
            case 'trackChargeWithProperties': {
              mixpanel.trackChargeWithProperties(event, props);
              break;
            }
            case 'increment': {
              mixpanel.increment(event, props);
              break;
            }
          }
    }
    catch (error) {
    }
    return next(action)
  }
}
