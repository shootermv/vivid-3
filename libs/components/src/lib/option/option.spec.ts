import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon';
import { ListboxOption } from './option';
import '.';
import { listboxOptionDefinition } from './definition';

const COMPONENT_TAG = 'vwc-option';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-option', () => {
	let element: ListboxOption;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ListboxOption;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-option', async () => {
			expect(listboxOptionDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(ListboxOption);
			expect(element.text).toEqual('');
			expect(element.value).toEqual('');
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.selected).toBeFalsy();
			expect(element.checked).toBeUndefined();
			expect(element.disabled).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.name)
				.toEqual('home');
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';

			element.text = text;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base');
			expect(base?.textContent?.trim()).toEqual(text);
		});
	});

	it('should set the `aria-selected` attribute with the `selected` value when provided', async () => {
		element.selected = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-selected')).toEqual('true');
	});

	it('should set the `aria-checked` attribute with the `checked` value when provided', async () => {
		element.checked = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-checked')).toEqual('true');
	});

	it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
		element.disabled = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-disabled')).toEqual('true');
	});

	describe('label', function () {

		it('should reflect the label to an attribute', async function () {
			const label = 'label';
			element.label = label;
			await elementUpdated(element);
			expect(element.getAttribute('label')).toEqual(label);
		});

		it('should return the options\'s text when label attribute and value are not provided', async function () {
			const text = 'text';
			element.text = text;

			expect(element.label).toEqual(text);
		});

		it('should return the options\'s text when label attribute is not provided and value is', async function () {
			const value = 'value';
			const text = 'text';
			element.value = value;
			element.text = text;

			expect(element.label).toEqual(text);
		});

		it('should return the options\'s label instead of the text', async function () {
			const label = 'label';
			element.text = 'text';
			element.value = 'value';
			element.setAttribute('label', label);

			expect(element.label).toEqual(label);
		});
	});
});
