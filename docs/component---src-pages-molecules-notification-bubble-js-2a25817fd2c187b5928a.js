webpackJsonp([86185176045190],{407:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(){(0,r.sendSuccess)("Congratulations, you clicked the Button")}t.__esModule=!0;var u=n(1),o=l(u),i=n(4),c=l(i),r=n(81),s=l(r),f=n(19),d=l(f),m=n(52),b=l(m),h=n(69),p=l(h),E=n(238),B=l(E);t.default=function(){return o.default.createElement(d.default,null,o.default.createElement(b.default,null,o.default.createElement(s.default,null,o.default.createElement(c.default,null,o.default.createElement("h1",null,"NotificationBubble"),o.default.createElement("p",null,"NotificationBubbles are used to inform users about important information, when an action has failed or succeeded. They're a most prominent ways to communicate to merchants. NotificationBubbles are always visible and pop up at the bottom of a page."),o.default.createElement("h2",null,"Best practices"),o.default.createElement("ul",null,o.default.createElement("li",null,"Do use them when you otherwise users won't have any feedback."),o.default.createElement("li",null,"Don't use them extensive."),o.default.createElement("li",null,"Don't use them when no feedback is required.")),o.default.createElement("h2",null,"Example"),o.default.createElement("p",null,"To use NotificationBubbles you need to wrap the"," ",o.default.createElement("strong",null,"NotificationBubbleManager")," around your app. Use"," ",o.default.createElement("code",null,"sendSuccess()")," exported by the NotificationBubbleManager to show a Notification."),o.default.createElement(p.default,{onClick:a},"Click me!"),o.default.createElement(B.default,{options:{readOnly:"nocursor"}},"import NotificationBubbleManager, { sendSuccess } from '@allthings/elements/behaviour/NotificationBubbleManager'\nimport Button from '@allthings/elements/molecules/Button'\n\nconst ShowNotification = () => (\n  <NotificationBubbleManager>\n    <View>\n      <Button onClick={() => sendSuccess('Congratulations, you clicked the Button')}>\n        Click me!\n      </Button>\n    </View>\n  </NotificationBubbleManager>\n)")))))},e.exports=t.default}});