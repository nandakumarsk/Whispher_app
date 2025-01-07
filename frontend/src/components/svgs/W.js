const WSvg = (props) => (
	<div className="bg-black p-8 inline-block">
		<svg
			aria-hidden="true"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			className="h-24 w-24"
			{...props}
		>
			<path
				d="M10 10 L25 90 L50 50 L75 90 L90 10 L70 10 L50 60 L30 10 Z"
				fill="none"
				stroke="white"
				strokeWidth="5"
			/>
			<path
				d="M20 20 L33 80 L50 55 L67 80 L80 20 L65 20 L50 65 L35 20 Z"
				fill="none"
				stroke="white"
				strokeWidth="2.5"
			/>
		</svg>
	</div>
);

export default WSvg;
