export const getRandom = (num) => Math.ceil(Math.random() * num);

export const createElement = (tag, className) => {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);
	}

	return $tag;
};

export const getTime = () => {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;
};