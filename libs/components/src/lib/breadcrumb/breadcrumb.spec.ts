import {elementUpdated, fixture} from '@vivid-nx/shared';
import {axe, toHaveNoViolations} from 'jest-axe';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type {BreadcrumbItem} from '../breadcrumb-item/breadcrumb-item';
import { Breadcrumb } from './breadcrumb';
import '../breadcrumb-item';
import '.';
import { breadcrumbDefinition } from './definition';

expect.extend(toHaveNoViolations);
const COMPONENT_TAG = 'vwc-breadcrumb';

describe('vwc-breadcrumb', () => {
	const breadcrumbItemsTemplate = `
	  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
    <vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
    <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
    <vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
	`;

	let element: Breadcrumb;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>${breadcrumbItemsTemplate}</${COMPONENT_TAG}>`
		)) as Breadcrumb;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-breadcrumb', async () => {
			expect(breadcrumbDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Breadcrumb);
		});
	});

	it('should set separator true for all except the last item', function () {
		const itemElements = element.querySelectorAll('vwc-breadcrumb-item') as unknown as BreadcrumbItem[];

		expect(itemElements[0].separator).toEqual(true);
		expect(itemElements[1].separator).toEqual(true);
		expect(itemElements[2].separator).toEqual(true);
		expect(itemElements[3].separator).toEqual(false);
	});

	describe('aria-current', function () {
		/**
		 *
		 */
		function removeAElementFromBreadcrumbItem() {
			newItem.shadowRoot?.querySelector('a')
				?.remove();
		}
		let newItem: BreadcrumbItem;

		beforeEach(async function () {
			newItem = document.createElement('vwc-breadcrumb-item') as BreadcrumbItem;
			newItem.href = '#';
			newItem.text = 'breadcrumb';
			element.appendChild(newItem);
			await elementUpdated(element);
		});

		it('should set aria-current to last node internal a element if last node is href', async function () {
			const ariaCurrent = newItem.shadowRoot?.querySelector('a')?.getAttribute('aria-current');
			expect(ariaCurrent).toEqual('page');
		});

		it('should set aria-current to last node if last node is href and doesnt have internal a element', async function () {
			removeAElementFromBreadcrumbItem();
			element.slottedBreadcrumbItemsChanged();

			expect(newItem.ariaCurrent).toEqual('page');
		});

		it('should not set aria-current to last node if last node is not href', async function () {
			removeAElementFromBreadcrumbItem();
			newItem.removeAttribute('href');
			const ariaCurrent = newItem.getAttribute('aria-current');
			expect(ariaCurrent).toEqual(null);
		});
	});

	describe('a11y', () => {
		it('should pass accessibility test', async () => {
			const children = Array.from(element.children)
				.map(({ shadowRoot }) => shadowRoot?.innerHTML).join('');

			const exposedHtmlString =  element.shadowRoot?.innerHTML.replace('<slot></slot>', children) as string;
			const results = await axe(exposedHtmlString, {
				rules: {
					// components should not be tested as page content
					'region': { enabled: false }
				}
			});

			expect(results).toHaveNoViolations();
		});
	});
});
