import { elementUpdated, fixture, getBaseElement, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { FileUploader } from './file-uploader';
import { fileUploaderDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-file-uploader';

describe('vwc-file-uploader', () => {
	let element: FileUploader;

	beforeEach(async () => {
		element = fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		) as FileUploader;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-file-uploader', async () => {
			expect(fileUploaderDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(FileUploader);
			expect(element.label).toBeUndefined();
			expect(element.helperText).toBeUndefined();
			expect(element.maxFiles).toBeUndefined();
			expect(element.maxFileSize).toEqual(256);
			expect(element.uploadMultiple).toEqual(false);
			expect(element.acceptedFiles).toBeUndefined();
			expect(element.url).toBeUndefined();
			expect(element.method).toBeUndefined();
			expect(element.autoProcessQueue).toEqual(false);
		});
	});

	describe('label', function () {
		it('should set a file uploader label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label element only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});

		it('should set arialabel on host', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label'))
				.toEqual(labelText);
		});

		it('should set ariaLabel and override label', async function () {
			const ariaLabel = 'arialabel';
			const label = 'label';
			element.ariaLabel = ariaLabel;
			element.label = label;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label'))
				.toEqual(ariaLabel);
		});
	});

	describe('helper text', function () {
		it('should render the helper text when attribute is set on file uploader', async function () {
			const helperTextElementWithoutText = element.shadowRoot?.querySelector('.helper-text');
			const helperText = 'Helper Text';
			element.helperText = helperText;
			await elementUpdated(element);
			expect(helperTextElementWithoutText)
				.toBeNull();
			expect(element.shadowRoot?.querySelector('.helper-message')
				?.textContent
				?.trim())
				.toEqual(helperText);
		});
	});

	describe('max files', function () {
		it('should upload two files when maxFiles is set to 2', async function () {
			const maxFiles = 2;
			element.maxFiles = maxFiles;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);

			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);

			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(2);
		});

		it('should upload only one file when maxFiles is set to 1', async function () {
			const maxFiles = 1;
			element.maxFiles = maxFiles;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);

			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);

			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});
	});

	describe('max file size', function () {
		it('should upload file with size 0.1 when max file size is set to 0.2', async function () {
			const maxFileSize = 0.2;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);

			const file = await generateFile('london.png', 0.1);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});

		it('should not upload file with size 2 when max file size is set to 0.2', async function () {
			const maxFileSize = 0.2;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).toEqual(0);
		});
	});

	describe('get files with error status', function () {
		it('should have dz-error class and status when files not added', async function () {
			const maxFileSize = 0.2;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);

			const preview = element.shadowRoot?.querySelector('.dz-preview') as HTMLElement;
			expect(preview.classList).toContain('dz-error');

			expect(element.getFilesWithErrorStatus().length).toEqual(1);
		});
	});

	describe('upload multiple', function () {
		it('should accept multiple files if maxFiles is set to 2', async function () {
			const uploadMultiple = true;
			element.maxFiles = 2;
			element.uploadMultiple = uploadMultiple;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);
			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(2);
		});

		it('should not accept multiple files if maxFiles is set to 1', async function () {
			const uploadMultiple = true;
			element.maxFiles = 1;
			element.uploadMultiple = uploadMultiple;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);
			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});

		it('should accept multiple files if maxFiles is not set', async function () {
			const uploadMultiple = true;
			element.uploadMultiple = uploadMultiple;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);
			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(2);
		});
	});

	describe('accepted files', function () {
		it('should add png file when acceptedFiles is null', async function () {
			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});

		it('should not add png file when acceptedFiles is set to .jpg', async function () {
			const acceptedFiles = '.jpg';
			element.acceptedFiles = acceptedFiles;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).not.toEqual(1);
		});
	});

	describe('remove files', function () {
		it('should have 1 files after adding 2 files and calling removeFile', async function () {
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);
			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(2);

			element.removeFile(firstFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
		});

		it('should remove files on click', async function () {
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);
			await elementUpdated(element);
			expect(element.files.length).toEqual(1);

			(getBaseElement(element).querySelector('.remove-btn') as HTMLElement).click();
			await elementUpdated(element);
			expect(element.files.length).toEqual(0);
		});
	});

	describe('choose file on enter key', function () {
		it('should open file on enter', async function () {
			element.focus();
			const spy = jest.spyOn(element, 'handleKeydown');
			getControlElement(element).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
			expect((spy as any).mock.calls.length).toEqual(1);
		});
	});

	describe('files', function () {
		it('should get an array with 2 files', async function () {
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);

			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);

			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
		});
	});

	describe('url', function () {
		it('should be "/" if not set', async function () {
			await elementUpdated(element);
			expect(element.options.url).toEqual('/');
		});

		it('should be equal to attribue if set', async function () {
			element = fixture(
				`<${COMPONENT_TAG} url="/path"></${COMPONENT_TAG}>`
			) as FileUploader;
			expect(element.options.url).toEqual('/path');
		});
	});

	describe('method', function () {
		it('should be "post" if not set', async function () {
			await elementUpdated(element);
			expect(element.options.method).toEqual('POST');
		});

		it('should be equal to attribue if set', async function () {
			element = fixture(
				`<${COMPONENT_TAG} method="put"></${COMPONENT_TAG}>`
			) as FileUploader;
			expect(element.options.method).toEqual('PUT');
		});
	});

	describe('auto process queue', function () {
		it('should be false if not set', async function () {
			await elementUpdated(element);
			expect(element.options.autoProcessQueue).toEqual(false);
		});

		it('should be equal to attribue if set', async function () {
			element.autoProcessQueue = true;
			await elementUpdated(element);
			expect(element.options.autoProcessQueue).toEqual(true);
		});

		it('should get queued files if not autoProcessQueue', async function () {
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getQueuedFiles().length).toEqual(1);
		});

		it('should not get queued files if autoProcessQueue is true', async function () {
			element.autoProcessQueue = true;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getQueuedFiles().length).toEqual(0);
		});
	});

	describe('processQueue', function () {
		it('should processQueue if not autoProcessQueue', async function () {
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getQueuedFiles().length).toEqual(1);

			element.processQueue();
			await elementUpdated(element);
			expect(element.getQueuedFiles().length).toEqual(0);
		});
	});

	async function generateFile(fileName: string, size: number): Promise<File> {
		const blob = new Blob(['x'.repeat(size * 1024 * 1024)], { type: 'text/plain' });
		return new File([blob], fileName, { type: blob.type });
	}
});