(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,n){},115:function(e,t,n){},126:function(e,t){},128:function(e,t){},135:function(e,t,n){},158:function(e,t,n){},160:function(e,t,n){"use strict";n.r(t);var o,a=n(0),i=n.n(a),r=n(22),s=n.n(r),u=(n(85),n(3)),c=n(4),l=n(12),d=n(11),p=n(13),m=n(17),v=n(76),h=n.n(v),f=(n(86),function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,null,[{key:"push",value:function(e,t){o(e,t)}},{key:"registerListener",value:function(e){o=e}}]),e}()),g=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={alerts:[]},n.push=n.push.bind(Object(m.a)(Object(m.a)(n))),f.registerListener(n.push),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state.alerts.map(function(e,t){return i.a.createElement(h.a,{key:t,variant:e.type},e.message)});return i.a.createElement("div",{className:"Alerts"},e)}},{key:"push",value:function(e,t){var n=this,o=JSON.parse(JSON.stringify(this.state.alerts));o.push({type:e,message:t}),this.setState({alerts:o}),setTimeout(function(){n.shiftAlerts()},5e3)}},{key:"shiftAlerts",value:function(){var e=JSON.parse(JSON.stringify(this.state.alerts));this.setState({alerts:e.slice(1)})}}]),t}(a.Component),b=n(20),E=n.n(b),y=n(77),k=n.n(y),S=n(14),N=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,null,[{key:"clearNodeSession",value:function(t,n){var o=e.makeNodeSessionKey(t,n);window.localStorage.removeItem(o)}},{key:"getNextSubmission",value:function(){var t=e.getSubmissions();return 0===t.length?null:t.shift()}},{key:"getNodeSession",value:function(t,n){var o=e.makeNodeSessionKey(t,n),a=window.localStorage.getItem(o);return null===a?[]:JSON.parse(a)}},{key:"getSessionNodeDrop",value:function(t,n,o,a){var i=e.getNodeSession(t,n),r={uid:o,quantity:a,count:0,ignored:!1},s=i.filter(function(e){return e.uid===o&&e.quantity===a}).shift();return void 0===s?r:s}},{key:"getSubmissions",value:function(){var e=window.localStorage.getItem("submissions");return null===e?[]:JSON.parse(e)}},{key:"getSubmitterName",value:function(){var e=window.localStorage.getItem("submitter_name");return null===e?"":e}},{key:"makeNodeSessionKey",value:function(e,t){return"event_"+e+"_node_"+t}},{key:"queueSubmission",value:function(t){var n=e.getSubmissions();n.push(t),window.localStorage.setItem("submissions",JSON.stringify(n))}},{key:"setSessionNodeDrop",value:function(t,n,o,a,i,r){var s=e.makeNodeSessionKey(t,n),u=e.getNodeSession(t,n).filter(function(e){return e.uid!==o||e.quantity!==a});u.push({uid:o,quantity:a,count:i,ignored:r}),window.localStorage.setItem(s,JSON.stringify(u))}},{key:"setSubmitterName",value:function(e){window.localStorage.setItem("submitter_name",e)}},{key:"shiftSubmissions",value:function(){var t=e.getSubmissions().slice(1);window.localStorage.setItem("submissions",JSON.stringify(t))}}]),e}(),w=(n(107),n(16)),D=n.n(w),O=function(e){function t(e){var n;Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).increment={interval:250,intervalSkips:3,iterator:0,pointerLeash:10,pointerX:null,pointerY:null,running:!1,timer:null,windowLeash:10,windowListener:null,windowPosition:null};var o=N.getSessionNodeDrop(e.nodeDrop.event_uid,e.nodeDrop.event_node_uid,e.nodeDrop.uid,e.nodeDrop.quantity);return o.showFilter=!1,o.active=!1,n.state=o,n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.ignored?" ignored":"",n=this.state.showFilter?" showFilter":"",o=this.state.active?" active":"",a=i.a.createElement("img",{className:"DropIcon",draggable:"false",src:this.props.drop.image,alt:this.props.drop.name,onMouseDown:function(t){return e.startIncrement(t,1)},onMouseMove:function(t){return e.checkMouseMove(t)},onMouseOut:function(t){return e.stopIncrement()},onMouseUp:function(t){return e.doMouseUp(1)}}),r=i.a.createElement("span",{className:"DropIndicator"},"+"),s=this.props.nodeDrop.quantity>1?i.a.createElement("span",{className:"DropQuantity"},this.props.nodeDrop.quantity):"",u=i.a.createElement(D.a.Control,{type:"text",className:"DropInput form-control form-control-sm",value:this.state.count,onChange:function(t){return e.changeCount(t)}}),c=i.a.createElement(E.a,{variant:"primary",block:!0,size:"sm",className:"DropDecrement",onMouseDown:function(t){return e.startIncrement(t,-1)},onMouseMove:function(t){return e.checkMouseMove(t)},onMouseOut:function(t){return e.stopIncrement()},onMouseUp:function(t){return e.doMouseUp(-1)}},i.a.createElement(S.a,{icon:"minus"})),l=i.a.createElement("div",{className:"DropToggle",onClick:function(t){return e.toggleIgnored()}},i.a.createElement(S.a,{className:"DropToggleIcon",icon:this.state.ignored?"ban":"check"}));return i.a.createElement("div",{className:"Drop"+t+n+o},i.a.createElement("div",{className:"DropBorder"},i.a.createElement("div",{className:"DropContent"},i.a.createElement("div",{className:"DropIconBox"},a,r,s),u,c),l))}},{key:"changeCount",value:function(e){this.setCount(e.target.value)}},{key:"checkMouseMove",value:function(e){if(this.increment.running){var t=e.clientX,n=e.clientY,o=Math.abs(t-this.increment.pointerX),a=Math.abs(n-this.increment.pointerY);(o>this.increment.pointerLeash||a>this.increment.pointerLeash)&&this.stopIncrement()}}},{key:"clear",value:function(){this.setCount(0)}},{key:"doIncrement",value:function(e){var t=this;this.setCount(0+this.state.count+e),this.setState({active:!0}),setTimeout(function(){t.setState({active:!1})},50),this.props.onClick&&this.props.onClick()}},{key:"doMouseUp",value:function(e){this.increment.running&&(this.increment.iterator<=this.increment.intervalSkips&&this.doIncrement(e),this.stopIncrement())}},{key:"getState",value:function(){return{uid:this.state.uid,quantity:this.state.quantity,count:this.state.count,ignored:this.state.ignored}}},{key:"setCount",value:function(e){"string"===typeof e&&""!==e&&(e=parseInt(e)),(isNaN(e)||e<0)&&(e=0),N.setSessionNodeDrop(this.props.nodeDrop.event_uid,this.props.nodeDrop.event_node_uid,this.props.nodeDrop.uid,this.props.nodeDrop.quantity,e,this.state.ignored),this.setState(N.getSessionNodeDrop(this.props.nodeDrop.event_uid,this.props.nodeDrop.event_node_uid,this.props.nodeDrop.uid,this.props.nodeDrop.quantity))}},{key:"startIncrement",value:function(e,t){this.stopIncrement();var n=this;this.increment.iterator=0,this.increment.pointerX=e.clientX,this.increment.pointerY=e.clientY,this.increment.timer=setInterval(function(){n.increment.iterator>n.increment.intervalSkips&&n.doIncrement(t),n.increment.iterator++},this.increment.interval),this.increment.windowPosition=window.scrollY,this.increment.windowListener=function(e){Math.abs(window.scrollY-n.increment.windowPosition)>n.increment.windowLeash&&n.stopIncrement()},window.addEventListener("scroll",this.increment.windowListener),this.increment.running=!0}},{key:"stopIncrement",value:function(){this.increment.running&&(clearInterval(this.increment.timer),window.removeEventListener("scroll",this.increment.windowListener),this.increment.timer=null,this.increment.windowListener=null,this.increment.running=!1)}},{key:"toggleFilter",value:function(){this.setState({showFilter:!this.state.showFilter})}},{key:"toggleIgnored",value:function(){N.setSessionNodeDrop(this.props.nodeDrop.event_uid,this.props.nodeDrop.event_node_uid,this.props.nodeDrop.uid,this.props.nodeDrop.quantity,0,!this.state.ignored),this.setState(N.getSessionNodeDrop(this.props.nodeDrop.event_uid,this.props.nodeDrop.event_node_uid,this.props.nodeDrop.uid,this.props.nodeDrop.quantity))}}]),t}(i.a.Component),C=(n(115),"https://submissions.atlasacademy.io"),I=n(116).XMLHttpRequest,j=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,null,[{key:"getEvents",value:function(e){var t=new I;t.onload=function(){var n=JSON.parse(t.responseText).filter(function(e){return e.submittable});e(n)},t.open("GET",C+"/event"),t.send()}},{key:"getEvent",value:function(e,t){var n=new I;n.onload=function(){var e=JSON.parse(n.responseText);e.submittable&&t(e)},n.open("GET",C+"/event/"+e),n.send()}},{key:"postSubmission",value:function(e,t,n){var o,a=new I,i=[];i.push(encodeURIComponent("event_uid")+"="+encodeURIComponent(e.event_uid)),i.push(encodeURIComponent("event_node_uid")+"="+encodeURIComponent(e.event_node_uid)),i.push(encodeURIComponent("submitter")+"="+encodeURIComponent(e.submitter)),e.drops.forEach(function(e,t){for(var n in e){var o="boolean"===typeof e[n]?Number(e[n]):encodeURIComponent(e[n]);i.push(encodeURIComponent("drops["+t+"]["+n+"]")+"="+o)}}),o=i.join("&").replace(/%20/g,"+"),a.onload=function(){if(200===a.status){var e=JSON.parse(a.responseText);t(e)}else n(a.status)},a.onerror=function(){n(a.status)},a.open("POST",C+"/submit/run"),a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.send(o)}}]),e}(),M=!1,_=null,L=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,null,[{key:"hasQueued",value:function(){return null!==N.getNextSubmission()}},{key:"push",value:function(t,n){var o=e.hasQueued();N.queueSubmission(t),o||e.sendNext(n)}},{key:"scheduleNext",value:function(t){M||e.hasQueued()&&(M=!0,_=setTimeout(function(){e.sendNext()},t?2500:2e4))}},{key:"sendNext",value:function(t){M&&clearTimeout(_),M=!1,_=null;var n=N.getNextSubmission();null!==n?j.postSubmission(n,function(n){f.push("success","Created new submission: "+n.receipt),N.shiftSubmissions(),n.missing_drops&&t&&t(),e.scheduleNext(!0)},function(t){422===t&&(f.push("danger","Invalid submission. Removing from queue."),N.shiftSubmissions()),e.scheduleNext(!1)}):e.scheduleNext(!1)}}]),e}(),x=n(79),R=n.n(x),T=n(35),U=n.n(T),q=n(78),J=function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=i.a.createElement("img",{className:"DropIcon",draggable:"false",src:this.props.drop.image,alt:this.props.drop.name,onMouseDown:function(t){return e.startIncrement(t,1)},onMouseMove:function(t){return e.checkMouseMove(t)},onMouseOut:function(t){return e.stopIncrement()},onMouseUp:function(t){return e.doMouseUp(1)}}),n=i.a.createElement("span",{className:"DropIndicator"},"BONUS"),o=i.a.createElement(D.a.Control,{as:"select",size:"sm",className:"DropInput",value:this.state.count,onChange:function(t){return e.changeCount(t)}},i.a.createElement("option",null,"0"),i.a.createElement("option",null,"10"),i.a.createElement("option",null,"20"),i.a.createElement("option",null,"30"),i.a.createElement("option",null,"40"),i.a.createElement("option",null,"50"),i.a.createElement("option",null,"60"),i.a.createElement("option",null,"70"),i.a.createElement("option",null,"80"),i.a.createElement("option",null,"90"),i.a.createElement("option",null,"100")),a=i.a.createElement(E.a,{variant:"primary",block:!0,size:"sm",className:"DropDecrement",onMouseDown:function(t){return e.startIncrement(t,-1)},onMouseMove:function(t){return e.checkMouseMove(t)},onMouseOut:function(t){return e.stopIncrement()},onMouseUp:function(t){return e.doMouseUp(-1)}},i.a.createElement(S.a,{icon:"minus"})),r=i.a.createElement("div",{className:"DropToggle",onClick:function(t){return e.toggleIgnored()}},i.a.createElement(S.a,{className:"DropToggleIcon",icon:this.state.ignored?"ban":"check"}));return i.a.createElement("div",{className:"Drop"},i.a.createElement("div",{className:"DropBorder"},i.a.createElement("div",{className:"DropContent"},i.a.createElement("div",{className:"DropIconBox"},t,n),o,a),r))}},{key:"clear",value:function(){}},{key:"doIncrement",value:function(e){var t=this,n=0+this.state.count+10*e;n>100&&(n=100),this.setCount(n),this.setState({active:!0}),setTimeout(function(){t.setState({active:!1})},50),this.props.onClick&&this.props.onClick()}}]),t}(O),A=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).dropRefs=[],n.clickSound=new q.Howl({src:"./sounds/click.mp3"}),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"Node"},i.a.createElement("div",{className:"DropsContainer"},this.renderDrops()),i.a.createElement(R.a,null,i.a.createElement(U.a,null,i.a.createElement(E.a,{variant:"primary",block:!0,onClick:function(t){return e.toggleFilter()}},i.a.createElement(S.a,{icon:"filter"})," Toggle Filter")),i.a.createElement(U.a,null,i.a.createElement(E.a,{variant:"success",block:!0,onClick:function(t){return e.submit()}},i.a.createElement(S.a,{icon:"copy"})," Submit Run"))))}},{key:"renderDrops",value:function(){var e=this;return this.props.nodeDrops.map(function(t,n){var o=e.props.drops.filter(function(e){return e.uid===t.uid}).shift();return"Bonus Rate-Up"===o.type?i.a.createElement(J,{key:n,nodeDrop:t,drop:o,onClick:function(){e.notifyClick()},ref:function(t){e.dropRefs.push(t)}}):i.a.createElement(O,{key:n,nodeDrop:t,drop:o,onClick:function(){e.notifyClick()},ref:function(t){e.dropRefs.push(t)}})})}},{key:"clearDrops",value:function(){this.dropRefs.forEach(function(e){e.clear()})}},{key:"notifyClick",value:function(){this.clickSound.play(),window.navigator.vibrate(100)}},{key:"toggleFilter",value:function(){this.dropRefs.forEach(function(e){e.toggleFilter()})}},{key:"submit",value:function(){var e=this,t={event_uid:this.props.node.event_uid,event_node_uid:this.props.node.uid,submitter:N.getSubmitterName(),drops:this.dropRefs.map(function(e){return e.getState()})};L.push(t,function(){e.props.onOutdated&&e.props.onOutdated()}),N.clearNodeSession(this.props.node.event_uid,this.props.node.uid),this.clearDrops()}}]),t}(i.a.Component),B=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,null,[{key:"get",value:function(t){return e.urlParams().has(t)?e.urlParams().get(t):""}},{key:"getEvent",value:function(){return e.get("event")}},{key:"getNode",value:function(){return e.get("node")}},{key:"setEvent",value:function(t){var n=e.urlParams();t?n.set("event",t):n.delete("event"),n.delete("node"),e.update("?"+n.toString())}},{key:"setNode",value:function(t){var n=e.urlParams();t?n.set("node",t):n.delete("node"),e.update("?"+n.toString())}},{key:"update",value:function(e){var t=window.location.protocol+"//"+window.location.host+window.location.pathname+e;window.history.replaceState({path:t},"",t)}},{key:"urlParams",value:function(){return new URLSearchParams(window.location.search)}}]),e}(),F=(n(135),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).selectNode=n.selectNode.bind(Object(m.a)(Object(m.a)(n))),n.nodeKey=0,n.state=n.extractNode(B.getNode()),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"extractNode",value:function(e){var t=this.props.event.nodes.filter(function(t){return t.uid===e}).pop(),n=this.props.event.node_drops.filter(function(t){return t.event_node_uid===e}).sort(function(e,t){return e.sort-t.sort}),o=k()(n.map(function(e){return e.uid})),a=this.props.event.drops.filter(function(e){return-1!==o.indexOf(e.uid)});return{selectedNode:e,node:t,nodeDrops:n,drops:a}}},{key:"render",value:function(){return i.a.createElement("div",{className:"Event"},this.renderNodeSelector(),this.renderNode())}},{key:"renderNode",value:function(){if(this.state.selectedNode)return i.a.createElement(A,{key:this.nodeKey,node:this.state.node,nodeDrops:this.state.nodeDrops,drops:this.state.drops,onOutdated:this.props.onOutdated})}},{key:"renderNodeSelector",value:function(){var e=0,t=[i.a.createElement("option",{key:e++,value:""},"Select a node")].concat(this.props.event.nodes.map(function(t){return i.a.createElement("option",{key:e++,value:t.uid},t.name)}));return i.a.createElement(D.a.Control,{as:"select",className:"NodeSelector custom-select",onChange:this.selectNode,value:this.state.selectedNode},t)}},{key:"selectNode",value:function(e){this.nodeKey++;var t=e.target.value;B.setNode(t),this.setState(this.extractNode(t))}}]),t}(i.a.Component)),P=n(32),K=n.n(P),Y=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={show:!N.getSubmitterName(),submitter_name:N.getSubmitterName()},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(K.a,{show:this.state.show,onHide:function(t){return e.handleClose()}},i.a.createElement(K.a.Header,{closeButton:!0},i.a.createElement(K.a.Title,null,"Settings")),i.a.createElement(K.a.Body,null,i.a.createElement(D.a.Group,{controlId:"settingSubmitterName"},i.a.createElement(D.a.Label,null,"Submitter Name"),i.a.createElement(D.a.Control,{value:this.state.submitter_name,onChange:function(t){return e.setSubmitterName(t.target.value)},ref:function(t){e.submitterInput=t}}))))}},{key:"componentDidMount",value:function(){N.getSubmitterName()||this.submitterInput.focus()}},{key:"handleClose",value:function(){this.setState({show:!1})}},{key:"setSubmitterName",value:function(e){N.setSubmitterName(e),this.setState({submitter_name:N.getSubmitterName()})}},{key:"toggle",value:function(){this.setState({show:!this.state.show})}}]),t}(i.a.Component),X=(n(158),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).selectEvent=n.selectEvent.bind(Object(m.a)(Object(m.a)(n))),n.state={isLoadingEvents:!0,isLoadingEvent:!1,eventsData:[],eventData:null,selectedEvent:B.getEvent()},j.getEvents(function(e){n.setState({isLoadingEvents:!1,isLoadingEvent:n.state.selectedEvent.length>0,eventsData:e}),n.state.selectedEvent.length>0&&j.getEvent(n.state.selectedEvent,function(e){n.setState({isLoadingEvent:!1,eventData:e})})}),L.scheduleNext(!0),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"AppTitle"},i.a.createElement("h1",null,"Drop Serializer",i.a.createElement("small",null,"by ",i.a.createElement("a",{href:"https://discord.gg/TKJmuCR"},"Atlas Academy"))),i.a.createElement(E.a,{variant:"primary",className:"AppSettingsToggle",onClick:function(t){return e.setting.toggle()}},i.a.createElement(S.a,{icon:"cog"})),i.a.createElement("div",{className:"AppLinks"},i.a.createElement("a",{href:"https://github.com/atlasacademy/drop-serializer-react",className:"text-secondary",target:"_blank",rel:"noopener noreferrer author"},i.a.createElement(S.a,{icon:["fab","github"]})),i.a.createElement("a",{href:"https://discord.gg/TKJmuCR",className:"text-secondary",target:"_blank",rel:"noopener noreferrer author"},i.a.createElement(S.a,{icon:["fab","discord"]})))),i.a.createElement(g,null),this.renderEventSelector(),this.renderEvent(),this.renderSettings(),this.renderLoading())}},{key:"refreshSettings",value:function(){}},{key:"reloadEvent",value:function(){var e=this;f.push("warning","Event is outdated. Reloading event."),this.setState({isLoadingEvent:!0,eventData:null}),j.getEvent(this.state.selectedEvent,function(t){e.setState({isLoadingEvent:!1,eventData:t})})}},{key:"renderEvent",value:function(){var e=this;if(this.state.selectedEvent&&this.state.eventData)return i.a.createElement(F,{event:this.state.eventData,selected:this.state.selectedEvent,onOutdated:function(){e.reloadEvent()}})}},{key:"renderEventSelector",value:function(){if(!this.state.isLoadingEvents){var e=0,t=[i.a.createElement("option",{key:e++,value:""},"Select a event")].concat(this.state.eventsData.map(function(t){return i.a.createElement("option",{key:e++,value:t.uid},t.name)}));return i.a.createElement(D.a.Control,{as:"select",className:"EventSelector",onChange:this.selectEvent,value:this.state.selectedEvent},t)}}},{key:"renderLoading",value:function(){if(this.state.isLoadingEvents||this.state.isLoadingEvent)return i.a.createElement("div",{className:"AppLoading"},i.a.createElement("div",{className:"AppLoadingContent"},i.a.createElement(S.a,{icon:"spinner",spin:!0})))}},{key:"renderSettings",value:function(){var e=this;return i.a.createElement(Y,{ref:function(t){e.setting=t},onChange:function(){e.refreshSettings()}})}},{key:"selectEvent",value:function(e){var t=this,n=e.target.value;B.setEvent(n),this.setState({isLoadingEvent:!1,eventData:null,selectedEvent:n}),n&&(this.setState({isLoadingEvent:!0}),j.getEvent(n,function(e){t.setState({isLoadingEvent:!1,eventData:e})}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(159);var z=n(15),H=n(21),Q=n(40);z.b.add(H.a),z.b.add(H.b),z.b.add(H.c),z.b.add(H.d),z.b.add(H.e),z.b.add(H.f),z.b.add(H.g),z.b.add(H.h),z.b.add(Q.a),z.b.add(Q.b),s.a.render(i.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},80:function(e,t,n){e.exports=n(160)},85:function(e,t,n){},86:function(e,t,n){}},[[80,1,2]]]);
//# sourceMappingURL=main.6a5424b4.chunk.js.map