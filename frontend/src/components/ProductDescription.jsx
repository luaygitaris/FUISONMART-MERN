const ProductDescription = () => {
	return <div className="max-padd-container mt-20">
        <div className="flex gap-3 mb-4">
            <button className="btn-dark rounded-sm !text-xs !py-[6px] w-36">Description</button>
            <button className="btn-outline rounded-sm !text-xs !py-[6px] w-36">Care Guide</button>
            <button className="btn-outline rounded-sm !text-xs !py-[6px] w-36">Size Guide</button>
        </div>
        <div className="flex flex-col pb-16">
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ducimus fugiat velit perspiciatis, ipsum vel temporibus nam rerum explicabo ad perferendis!</p>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ducimus fugiat velit perspiciatis, ipsum vel temporibus nam rerum explicabo ad perferendis!</p>
        </div>
    </div>;
};

export default ProductDescription;
