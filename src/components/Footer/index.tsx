type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className="bg-[#1d1e27] py-10 text-white max-h-[500px]">
            <div className="justify-center mx-auto w-5/6 gap-16 md:flex">
                <div className="md:mt-16 md:basis-1/2">
                    <img
                        className="w-1/2"
                        src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v7/logo-udemy.svg"
                        alt="logo"
                    />
                    <p className="my-5 text-sm md:text-[0.9rem]">
                        Lorem vitae ut augue auctor faucibus eget eget ut
                        libero. Elementum purus et arcu massa dictum
                        condimentum. Augue scelerisque iaculis orci ut habitant
                        laoreet. Iaculis tristique.
                    </p>
                    <p>© Evogym All Rights Reserved.</p>
                </div>
                <div className="flex md:flex-none justify-between text-sm md:text-[0.9rem]">
                    <div className="mt-6 md:basis-1/4 md:mt-0">
                        <h4 className="font-bold">Links</h4>
                        <p className="my-5">Massa orci senectus</p>
                        <p className="my-5">Et gravida id et etiam</p>
                        <p>Ullamcorper vivamus</p>
                    </div>
                    <div className="mt-6 md:basis-1/4 md:mt-0">
                        <h4 className="font-bold">Contact Us</h4>
                        <p className="my-5">
                            Tempus metus mattis risus volutpat egestas.
                        </p>
                        <p>(333)425-6825</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
