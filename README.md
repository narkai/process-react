![ProcessReact](./processreact.png)

## ProcessWire Site Profile for React

ProcessReact is a boilerplate for getting started with ProcessWire as a headless CMS for React (with Redux & Axios).

ProcessWire forum topic [here](https://processwire.com/talk/topic/19077-react-boilerplate/).

### Credits

Based on [ProcessVue](https://github.com/microcipcip/processvue), [Blogpost](https://processwire.com/talk/topic/15790-vue-20-boilerplate-for-processwire-30/).

And on @gebeer [tutorial](https://processwire.com/talk/topic/11806-tutorial-building-a-simple-rest-api-in-processwire/).

Thanks to [montmirail](https://github.com/montmirail) for his help on the React setup.

### Installation

Install ProcessWire with this profile, which was exported using the [ProcessExportProfile](https://modules.processwire.com/modules/process-export-profile/) module.

Setup /site/templates/client/api.js with your server base URL.

Install React modules and start the client:

```
cd site/templates/client
npm install
npm start
```

Go to http://localhost:3030/
