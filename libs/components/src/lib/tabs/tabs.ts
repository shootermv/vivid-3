import { attr, observable } from '@microsoft/fast-element';
import { Tabs as FoundationTabs, TabsOrientation } from '@microsoft/fast-foundation';
import type { Connotation } from '../enums.js';

export const ACTIVE_TAB_WIDTH = '--_tabs-active-tab-inline-size';

/**
 * Types of tabs connotation.
 *
 * @public
 */
export type TabsConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

/**
 * Base class for tabs
 *
 * @public
 * @slot - Default slot.
 */
export class Tabs extends FoundationTabs {

	@observable tablist?: HTMLElement;
	/**
	 * The connotation the tabs should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TabsConnotation;
	connotationChanged() {
		this.#updateTabsConnotation();
	}

	override orientationChanged(): void {
		super.orientationChanged();
		this.patchIndicatorStyleTransition();
		if (!this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical) {
			this.activeIndicatorRef.style.removeProperty(ACTIVE_TAB_WIDTH);
		}
		this.#patchActiveID();
	}

	override activeidChanged(oldValue: string, newValue: string): void {
		super.activeidChanged(oldValue, newValue);
		this.patchIndicatorStyleTransition();
		this.#patchActiveID();
	}

	override tabsChanged(): 	void {
		super.tabsChanged();
		this.patchIndicatorStyleTransition();
		this.#patchActiveID();
	}

	override tabpanelsChanged(): void {
		super.tabpanelsChanged();
		this.patchIndicatorStyleTransition();
		this.#patchActiveID();
	}

	patchIndicatorStyleTransition() {
		if (!this.activetab || !this.activeIndicatorRef) return;
		if (this.orientation === TabsOrientation.vertical || !this.showActiveIndicator) return;
		const width = this.activetab.getBoundingClientRect().width;
		this.activeIndicatorRef.style.setProperty(ACTIVE_TAB_WIDTH, `${width}px`);
	}

	#updateTabsConnotation() {
		if (this.tabs) {
			this.tabs.forEach(tab => {
				if (tab.getAttribute('aria-selected') === 'true') {
					tab.setAttribute('connotation', this.connotation as string);
				} else {
					tab.removeAttribute('connotation');
				}
			});
		}
	}

	get #tabListWrapper() {
		return this.shadowRoot!.querySelector('.tablist-wrapper') as HTMLElement;
	}

	#scrollToIndex(index: number) {
		const tab = this.tabs[index];
		if (!tab) return;
		let left = 0;
		let top = 0;
		if (this.orientation === TabsOrientation.vertical) {
			if (index === this.tabs.length - 1) {
				top = this.#tabListWrapper.scrollHeight;
			}
			if (index > 0 && index < this.tabs.length - 1) {
				top = tab.offsetTop - this.#tabListWrapper.offsetHeight / 2 + (tab.offsetHeight / 2);
			}
		} else {
			if (index === this.tabs.length - 1) {
				left = this.#tabListWrapper.scrollWidth;
			}
			if (index > 0 && index < this.tabs.length - 1) {
				left = tab.offsetLeft - this.#tabListWrapper.offsetWidth / 2 + (tab.offsetWidth / 2);
			}
		}

		this.#tabListWrapper.scrollTo({top, left, behavior: 'smooth'});
	}
	// adapted FAST fix https://github.com/microsoft/fast/pull/6606
	#patchActiveID() {
		if (!this.activetab) return;

		const idx = this.tabs.indexOf(this.activetab);
		this.activeid = this['tabIds'][idx];
		this.#updateTabsConnotation();

		this.#scrollToIndex(idx);
	}
}
