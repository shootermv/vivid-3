import {html, ViewTemplate, when} from '@microsoft/fast-element';
import type {ElementDefinitionContext} from '@microsoft/fast-foundation';
import {Icon} from '../icon/icon';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import {DataGridCellRole, DataGridCellSortStates} from './data-grid.options';
import type {DataGridCell} from './data-grid-cell';

function shouldShowSortIcons<T extends DataGridCell>(x: T): boolean {
	if (x.columnDefinition) {
		x.ariaSort = !x.columnDefinition.sortable ? null : x.columnDefinition.sortDirection ?
			x.columnDefinition.sortDirection : DataGridCellSortStates.none;
	}
	return x.cellType === 'columnheader' && x.ariaSort !== null && x.ariaSort !== DataGridCellSortStates.other;
}

function getSortIcon<T extends DataGridCell>(x: T): string {
	return x.ariaSort === DataGridCellSortStates.ascending ? 'sort-asc-solid' :
		x.ariaSort === DataGridCellSortStates.descending ? 'sort-desc-solid' : 'sort-solid';
}
function renderSortIcons<T extends DataGridCell>(c: ElementDefinitionContext) {
	const iconTag = c.tagFor(Icon);
	return html<T>`
			${when(shouldShowSortIcons, html<T>`
				<${iconTag} class="header-icon" name="${getSortIcon}"></${iconTag}>
			`)}
		`;
}

function handleClick<T extends DataGridCell>(x: T) {
	if (x.cellType === 'columnheader' && x.ariaSort !== null) {
		x.$emit('sort',
			{columnDataKey: (x.columnDefinition && x.columnDefinition.columnDataKey) ?
				x.columnDefinition.columnDataKey : x.textContent!.trim(), sortDirection: x.ariaSort});
	}
}
export function DataGridCellTemplate<T extends DataGridCell>(context: ElementDefinitionContext): ViewTemplate<T> {
	const focusTemplate = focusTemplateFactory(context);
	return html<T>`
        <template
            tabindex="-1"
            role="${x => DataGridCellRole[x.cellType] ?? DataGridCellRole.default}"
						@click="${handleClick}"
        >
					<div class="base">
							<slot></slot>
							${() => focusTemplate}
							${_ => renderSortIcons(context)}
					</div>

        </template>
    `;
}
