import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import {
	loadComponents,
	loadTemplate
} from '../../visual-tests/visual-tests-utils.js';

const components = ['split-button'];
test('should show the component', async ({ page }: { page: Page }) => {
	const template = `
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' label='A default button'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button label='ghost' appearance='ghost'></vwc-split-button>
		<vwc-split-button label='filled' appearance='filled'></vwc-split-button>
		<vwc-split-button label='outlined' appearance='outlined'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="filled" icon='message-sent-line' aria-label="Send Message"></vwc-split-button>
		<vwc-split-button appearance="filled" icon='message-sent-line' aria-label="Send Message" shape="pill"></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="filled" label='icon' icon='check-line'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' label='rounded' shape='rounded'></vwc-split-button>
		<vwc-split-button appearance='filled' label='pill' shape='pill'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='filled' label='super-condensed' size='super-condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' label='condensed' size='condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' label='normal' size='normal'></vwc-split-button>
		<vwc-split-button appearance='filled' label='expanded' size='expanded'></vwc-split-button>
	</div>
		<div style="margin: 5px;">
		<vwc-split-button appearance='filled' icon='message-sent-line' size='super-condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' icon='message-sent-line' size='condensed'></vwc-split-button>
		<vwc-split-button appearance='filled' icon='message-sent-line' size='normal'></vwc-split-button>
		<vwc-split-button appearance='filled' icon='message-sent-line' size='expanded'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="ghost" label='accent' connotation='accent'></vwc-split-button>
		<vwc-split-button appearance="ghost" label='cta' connotation='cta'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="filled" label='accent' connotation='accent'></vwc-split-button>
		<vwc-split-button appearance="filled" label='cta' connotation='cta'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="outlined" label='accent' connotation='accent'></vwc-split-button>
		<vwc-split-button appearance="outlined" label='cta' connotation='cta'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance='ghost' label='ghost' disabled></vwc-split-button>
		<vwc-split-button appearance='filled' label='filled' disabled></vwc-split-button>
		<vwc-split-button appearance='outlined' label='outlined' disabled></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="ghost" label="ghost" pending></vwc-split-button>
		<vwc-split-button appearance="filled" label="filled" pending></vwc-split-button>
		<vwc-split-button appearance="outlined" label="outlined" pending></vwc-split-button>
		<vwc-split-button appearance="filled" label="super-condensed" size="super-condensed" pending></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button appearance="ghost" icon="check-line" label="ghost" pending></vwc-split-button>
		<vwc-split-button appearance="filled" icon="check-line" label="filled" pending></vwc-split-button>
		<vwc-split-button appearance="outlined" icon="check-line" label="outlined" pending></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button connotation='cta' shape='pill' icon='microphone-solid' aria-label="Mute"></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button style='display: block;' label="I'm full width" shape='pill' appearance='filled'></vwc-split-button>
	</div>
	<div style="margin: 5px;">
		<vwc-split-button style="width: 150px; --button-line-clamp: 2;"
		label="I'm button with long text and text wrap"shape='pill' appearance='filled'>
		</vwc-split-button>
	</div>
	</div>
	`;

	page.setViewportSize({ width: 500, height: 720 });

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

	expect(await testWrapper?.screenshot())
		.toMatchSnapshot(
			'./snapshots/split-button.png',
		);
});
