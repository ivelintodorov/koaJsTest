const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();


// Replace with DB
const things = ['My Family', 'Programming', 'Music'];
// Json prettier Middleware
app.use(json());
// BodyParser Middleware
app.use(bodyParser());


app.context.user = 'Brad';

render(app, {
    root: path.join(__dirname, "views"),
    layout: "layout",
    viewExt: "html",
    cache: false,
    debug: false
});
// Routers
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I Love:',
        things: things
    });
}

//Show add page
async function showAdd(ctx) {
    await ctx.render('add');
}

// Add thing
async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');

}

router.get("/test", ctx => (ctx.body = `Hello ${ctx.user}`));
router.get("/test/:name", ctx => (ctx.body = `Hello ${ctx.params.name}`));

//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server Started"));