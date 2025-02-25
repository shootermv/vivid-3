import { attr, observable } from '@microsoft/fast-element';
import {
	applyMixins,
	MenuItem as FastMenuItem,
	MenuItemRole as FastMenuItemRole,
} from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

export const MenuItemRole = {
	...FastMenuItemRole,
	presentation: 'presentation',
} as const;

/**
 * Base class for menu-item
 *
 * @public
 * @slot meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 */
export class MenuItem extends FastMenuItem {
	/**
	 * Indicates the menu item's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
	/**
	 * Indicates the menu item's secondary text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr({ attribute: 'text-secondary' }) textSecondary?: string;

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: HTMLElement[];
}

export interface MenuItem extends AffixIcon {}

applyMixins(MenuItem, AffixIcon);
