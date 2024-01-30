import { useState } from 'react';

import ModalDropdown from '@/src/components/ui/ModalInput/ModalDropdown';
import ModalImage from '@/src/components/ui/ModalInput/ModalImage';
import ModalInput from '@/src/components/ui/ModalInput/ModalInput';
import ModalTextarea from '@/src/components/ui/ModalInput/ModalTextarea';

import mockupData from './mockup.json';

export default function Page() {
	// Tag 때문에 타입을 string[]으로 지정함.
	const [values, setValues] = useState<string[]>([]);
	// 일단 mockupData에는 string으로 해놨습니다만 실제로는 어떻게 작동할지 모르겠습니다.
	const progressOptions: string[] = mockupData.columns;

	const membersData = mockupData.members.map((member) => ({
		id: member.id,
		userId: member.userId,
		nickname: member.nickname,
		profileImageUrl: member.profileImageUrl,
		isOwner: member.isOwner,
	}));

	const handleValuesChange = (newValues: string[]) => {
		setValues(newValues);
	};
	return (
		<div className='flex flex-col gap-y-3 p-3'>
			<p>{values}</p>
			<ModalInput label='제목' onValuesChange={handleValuesChange} />
			<ModalInput label='마감일' onValuesChange={handleValuesChange} />
			<ModalInput label='태그' onValuesChange={handleValuesChange} />
			<ModalDropdown
				type='상태'
				options={progressOptions}
				currentValue={0}
				onValuesChange={handleValuesChange}
			/>
			<ModalDropdown
				type='담당자'
				currentValue={-1} // 담당자가 배정되지 않은 경우, -1로 기입
				members={membersData}
				onValuesChange={handleValuesChange}
			/>
			<ModalTextarea label='댓글' onValuesChange={handleValuesChange} />
			<ModalImage onValuesChange={handleValuesChange} />
		</div>
	);
}
