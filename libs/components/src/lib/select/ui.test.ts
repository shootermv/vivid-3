import * as path from 'path';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	extractHTMLBlocksFromReadme,
	loadComponents,
	loadTemplate,
} from '../../visual-tests/visual-tests-utils.js';

const components = ['select', 'option', 'badge'];

test('should show the component', async ({ page }: { page: Page }) => {

	const template = `
			<style>
				#wrapper {
					width: 1800px;
					display: grid;
					grid-auto-rows: 250px;
					grid-template-columns: repeat(8, 1fr);
				}
			</style>` + extractHTMLBlocksFromReadme(
		path.join(new URL('.', import.meta.url).pathname, 'README.md'))
		.reduce((htmlString: string, block: string) => `${htmlString} <div style="margin: 5px;">${block}</div>`, '');

	await loadComponents({
		page,
		components,
	});
	await loadTemplate({
		page,
		template,
	});

	const testWrapper = await page.$('#wrapper');

	await page.waitForLoadState('networkidle');

	expect(await testWrapper?.screenshot()).toMatchSnapshot(
		'./snapshots/select.png'
	);
});
