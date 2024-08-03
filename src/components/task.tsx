import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

export default function Task() {
	return (
		<Card className="w-full">
			<CardContent className="flex w-full flex-row items-center justify-between">
				<h1 className="max-w-[35%] truncate overflow-ellipsis">
					{'Task Name'}
				</h1>
				<Separator orientation="vertical" />
				<p className="max-w-[35%] truncate overflow-ellipsis">{'category'}</p>

				<Separator orientation="vertical" />
				<p>{'#'}</p>
			</CardContent>
		</Card>
	);
}
