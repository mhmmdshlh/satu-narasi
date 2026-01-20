const PageHeader = ({ title, description }) => (
    <section className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-gradient text-white py-12 px-8 rounded-3xl shadow-2xl">
                <h1 className="text-4xl md:text-5xl font-black mb-4">{title}</h1>
                <p className="text-xl">{description}</p>
            </div>
        </div>
    </section>
);

export default PageHeader;
