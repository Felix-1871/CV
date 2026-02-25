import { promises as fs} from 'fs'
import { render } from "resumed";
import * as theme from 'jsonresume-theme-papirus-feli'
import * as themepl from 'jsonresume-theme-papirus-feli-pl'
import puppeteer from 'puppeteer'
import minimist from 'minimist'

const args = minimist(process.argv.slice(2));

var resumeDirectory;
var exportDirectory;
var category;
var used_theme;

switch (args.lang) {
    case "en":
        resumeDirectory = "./Templates/EN/";
        exportDirectory = "./Resumes/EN/";
        used_theme = theme;
        break;
    case "pl":
        resumeDirectory = "./Templates/PL/";
        exportDirectory = "./Resumes/PL/";
        used_theme = themepl;
    default:
        break;
}

switch (args.cat) {
    case "ai":
        category = "AI/";
        break;
    case "sales":
        category = "Sales/";
    case "notech":
        category = "No-tech/";
    default:
        category = "Default/";
        break;
}

const fullResumePath = resumeDirectory + category + 'resume.json';
const fullExportPath = exportDirectory + category + 'resume.pdf';

const resume = JSON.parse(await fs.readFile(fullResumePath, 'utf-8'));
const html = await render(resume, used_theme);

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setContent(html, { waitUntil: 'networkidle0'});
await page.pdf({ path: fullExportPath, format: 'a4', printBackground: true, pageRanges: '1'});
await browser.close();