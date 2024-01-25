import Image from 'next/image';
import React, { useState, useRef } from 'react';

function ModalProgressInput() {
	const [open, setOpen] = useState(false);
	// chip 생기면 대대적으로 수정 예정... 임시로 string으로 대체
	const progressOptions = ['To Do', 'On Progress', 'Done'];
	const [progress, setProgress] = useState(progressOptions[0]);

	const handleFocus = () => {
		setOpen(true);
	};

	// const handleBlur = () => {
	// 	setOpen(false);
	// };

	const handleProgress = (progressOption: string) => {
		setProgress(progressOption);
		setOpen(false);
	};

	return (
		<div className='flex flex-col items-start gap-2.5 '>
			<label htmlFor='progress' className='text-lg font-medium'>
				상태
			</label>
			<div>
				<button
					className='w-[217px] h-12 rounded-md border-solid border-[1px] border-gray3 bg-white relative focus:outline-none focus:ring-[1px] focus:ring-violet2 focus:z-20'
					onFocus={handleFocus}
					// onBlur={handleBlur} <- 이거 넣으면 li 클릭하는 것보다 onBlur가 먼저 동작해서 handleProgress가 동작 안 함... ㅠㅠ
				>
					<p>{progress}</p>
					<Image
						src='/icons/arrow_drop_down.svg'
						width={26}
						height={26}
						alt='Progress Dropdown'
						className='absolute right-4 top-3'
					/>
				</button>
				{open && (
					<ul className='flex flex-col mt-0.5 w-[217px] rounded-md border-[1px] border-solid border-gray3 bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.8)] absolute z-10'>
						{progressOptions.map((progressOption, index) => (
							<li key={index}>
								<button
									className='flex flex-row gap-1.5 px-2 py-[13px] w-full'
									onClick={() => handleProgress(progressOption)}
								>
									{progress === progressOption ? (
										<Image
											src='/icons/check.svg'
											width={22}
											height={22}
											alt={`${progressOption} Checked`}
										/>
									) : (
										<div className='w-[22px]' />
									)}
									<p>{progressOption}</p>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

function ModalManagerInput() {
	const [managerOptions, setManagerOptions] = useState<string[]>([]);
	const [managerInput, setManagerInput] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	// const [manager, setManager] = useState<string>('');

	const handleManagerInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setManagerInput(event.target.value);
	};

	const handleAddManager = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (
				managerInput.trim() !== '' &&
				!managerOptions.includes(managerInput.trim())
			) {
				setManagerOptions([...managerOptions, managerInput.trim()]);
			}
		}
	};

	const handleOpen = () => {
		if (managerOptions.length > 0) {
			setOpen(!open);
		}
	};

	const handleManager = (managerOption: string) => {
		setManagerInput(managerOption);
		// setManager(managerOption);
		setOpen(false);
	};

	return (
		<div className='flex flex-col items-start gap-2.5'>
			<label htmlFor='manager' className='text-lg font-medium'>
				담당자
			</label>
			<div className='relative'>
				<input
					type='text'
					name='manager'
					id='manager'
					placeholder='이름을 입력해주세요'
					value={managerInput}
					onChange={handleManagerInputChange}
					onKeyDown={handleAddManager}
					className='flex items-center h-12 gap-[10px] p-4 bg-white border-[1px] border-solid rounded-md w-[217px] border-gray3 text-base font-normal focus:outline-none focus:ring-[1px] focus:ring-violet2'
				/>
				<button className='absolute right-4 top-3' onClick={handleOpen}>
					<Image
						src='/icons/arrow_drop_down.svg'
						width={26}
						height={26}
						alt='Progress Dropdown'
					/>
				</button>
				{open && (
					<ul className='flex flex-col mt-0.5 w-[217px] rounded-md border-[1px] border-solid border-gray3 bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.8)] z-10 absolute'>
						{managerOptions.map((managerOption, index) => (
							<li key={index}>
								<button
									className='flex flex-row gap-1.5 px-2 py-[13px] w-full'
									onClick={() => handleManager(managerOption)}
								>
									<p>{managerOption}</p>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

function ModalCommentInput() {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleTextareaChange = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	return (
		<div className='inline-flex flex-col items-start gap-2.5'>
			<label htmlFor='comment' className='text-lg font-medium'>
				댓글
			</label>
			<div className='flex flex-col w-[450px] min-h-[110px] p-4 items-start gap-[10px] text-base font-normal border-gray3 bg-white border-solid border-[1px] rounded-md focus-within:outline-none focus-within:ring-[1px] focus-within:ring-violet2  relative'>
				<textarea
					ref={textareaRef}
					name='comment'
					id='comment'
					placeholder='댓글 작성하기'
					onChange={handleTextareaChange}
					className='w-full h-full border-none outline-none resize-none'
				/>
				{/* 차후 button 컴포넌트 삽입 예정(크기만 맞춘 임시 버튼) */}
				<button className='flex w-[83px] h-8 py-[9px] px-[31px] justify-center items-center gap-2.5 shrink-0 absolute bottom-3 right-3 border-solid border-[1px] border-gray3' />
			</div>
		</div>
	);
}

function ModalTitleInput() {
	return (
		<div className='inline-flex flex-col items-start gap-2.5'>
			<label htmlFor='title' className='text-lg font-medium'>
				제목 <span className='text-violet2'>*</span>
			</label>
			<input
				type='text'
				name='title'
				id='title'
				placeholder='제목을 입력해주세요'
				className='flex w-[450px] h-12 py-[14px] px-4 items-center gap-[10px] text-base font-normal border-gray3 bg-white border-solid border-[1px] rounded-md focus:outline-none focus:ring-[1px] focus:ring-violet2'
			/>
		</div>
	);
}

function ModalDeadlineInput() {
	return <div></div>;
}

function ModalTagInput() {
	const [tags, setTags] = useState<string[]>([]); // chip 생기면 대체할 예정
	const [tagInput, setTagInput] = useState<string>('');

	const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTagInput(event.target.value);
	};

	const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
				setTags([...tags, tagInput.trim()]);
			}
		}
	};

	return (
		<div className='inline-flex flex-col items-start gap-2.5'>
			<label htmlFor='tag' className='text-lg font-medium'>
				태그
			</label>
			<div className='w-[450px] px-2 flex flex-row items-center gap-[10px] text-base font-normal border-gray3 bg-white border-solid border-[1px] rounded-md focus-within:outline-none focus-within:ring-[1px] focus-within:ring-violet2 overflow-x-auto scroll-smooth snap-x'>
				{
					// chip 생기면 대체할 예정
					tags.map((tag, index) => (
						<p
							key={index}
							className='inline-flex items-center h-12 px-1 snap-start shrink-0'
						>
							{tag}
						</p>
					))
				}
				<input
					type='text'
					name='tag'
					id='tag'
					placeholder='입력 후 Enter'
					onChange={handleTagInputChange}
					onKeyDown={handleAddTag}
					className='w-full h-12 py-[14px] border-none outline-none min-w-24 snap-end shrink-0'
				/>
			</div>
		</div>
	);
}

function ModalImageInput() {
	return <div></div>;
}

export {
	ModalProgressInput,
	ModalManagerInput,
	ModalCommentInput,
	ModalTitleInput,
	ModalDeadlineInput,
	ModalTagInput,
	ModalImageInput,
};
