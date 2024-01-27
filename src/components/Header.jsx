import logo from "./../assets/lws-logo-en.svg"

const Header = () => {
    return (
        <div className="py-6 md:py-8 fixed top-0 w-full !bg-[#191D26] z-10">
		<div className="container mx-auto flex items-center justify-between gap-x-6">
			<a href="/">
				<img className="h-[45px]" src={logo} />
			</a>
		</div>
	</div>
    );
};

export default Header;