import React from 'react';
import ReactDOM from 'react-dom/client';
import Leaderboard from './components/leaderboard';
import './globals.css';

export function App() {
	return (
		<main className="grid min-h-screen w-full grid-cols-[20%,55%,25%] items-center justify-center overflow-x-hidden">
			<section className="w-full">
				Sidebar for task editing and user creation
			</section>
			<section className="w-full">Test</section>
			<section className="col-start-3 flex h-full w-full items-center justify-center">
				<Leaderboard />
			</section>
		</main>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
