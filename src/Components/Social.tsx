import { socialLinks } from "../User";

const Social = () => {
    const socialIcons = socialLinks
        .filter(socialLink => !socialLink.hide)  // Filter out links with the hide property
        .map((socialLink, index) => {
            const classNames = `font-mono text-lg hover:text-primaryColor hover:-translate-x-1 transition transform duration-300 ease-in-out`;
            return (
                <a
                    key={index}
                    href={`${socialLink.link}`}
                    target="_blank"
                    className={classNames}
                >
                    <div data-aos="fade-up-left" data-aos-duration="800">
                        <socialLink.icon stroke={1.5} className="-rotate-90" size={25} />
                    </div>
                </a>
            );
        });

        return (
            <div
                style={{ left: '-120px' }} // Adjust this value as needed
                className="flex md-mx:hidden text-textColor items-center gap-6 fixed bottom-32 rotate-90"
            >
                {socialIcons}
                <hr className="border w-40 rounded-full bg-textColor border-textColor" />
            </div>
        );
        

}

export default Social;
