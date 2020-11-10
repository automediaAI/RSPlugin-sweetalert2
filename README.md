# RSPlugin-sweetalert2
React Studio plugin for very sweet alerts!

# Instructions
1. Download from [here](https://github.com/automediaAI/RSPlugin-sweetalert2/releases/download/v1.0/sweetalert2.plugin.zip)
2. Access 'Components Plugin' folder from: React Studio Menu > Plugins > Show Plugin Manager > Show Plugins folder in Finder
3. Unzip and paste .plugin file in this folder
4. Click 'Reload Plugins' from Plugin Menu
5. You will see Styled Image component in the Components Menu

# How to use
1. When you drag the component to the frame, it doesn't matter where you place it, because the actual
	location of the alert will be governed by the sweetalert2 config that you set.
2. You can set three settings in the Plugin Parameters - Component (optional), sweetaler2 config (required), and custom name (optional)
3. If you want to use sweetalert2 with some other component as its HTML, you should set the component from the component picker dropdown. This will cause the selected component's HTML to be passed to sweetalert2. An example of an HTML based alert can be found [here](https://sweetalert2.github.io/recipe-gallery/login-form.html).
4. Next, you **must** set the sweetalert2 config. This time, we're not using a JSON config. We are using a config of the following type - 
	```
	title: '<strong>HTML <u>example</u></strong>',
	icon: 'info',
	html:
	'You can use <b>bold text</b>, ' +
	'<a href="//sweetalert2.github.io">links</a> ' +
	'and other HTML tags',
	showCloseButton: true,
	showCancelButton: true,
	focusConfirm: false,
	confirmButtonText:
	'<i class="fa fa-thumbs-up"></i> Great!',
	confirmButtonAriaLabel: 'Thumbs up, great!',
	cancelButtonText:
	'<i class="fa fa-thumbs-down"></i>',
	cancelButtonAriaLabel: 'Thumbs down'
	```
	As you can see, the config can include anything that is valid in sweetalert2. What matters is that you set the config exactly as such, as if you were writing a sweetalert2 config directly. Why? This plugin uses mustacheJS to directly drop in this configuration into the sweetalert JS code. This makes it very easy to code up and very easy for you to use.
5. Lastly, you can set the custom name. This is useful if you're creating multiple sweetalert2 components. It doesn't matter if the components are in different parts of your project, on different screens, or part of different component. If you're using sweetalert2 twice, you should name the component something else every time. Further, you can't seem to have two sweetalert2 components on the same page. Though this last part seems to be a restriction of sweetalert2 itself.

# Dependencies
This plugin is based on [sweetalert2](https://sweetalert2.github.io/) and [sweetalert2-react-content](https://github.com/sweetalert2/sweetalert2-react-content).

Logo courtesy [PNGRepo](https://www.pngrepo.com/svg/54322/donut)

# Plugin running in React Studio
![Plugin running in React Studio](https://raw.githubusercontent.com/automediaAI/RSPlugin-sweetalert2/main/screenshot.png)