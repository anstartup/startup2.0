
const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-zinc-200 py-10 border-t border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-xl text-primary mb-2">Skillexer</h3>
                        <p className="text-sm text-zinc-400">
                            Where talent meets opportunity. Skip the resume, show your skills, and get hired for what you can actually build.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">For Students</h4>
                        <ul className="space-y-1">
                            <li><a href="#create-profile" className="hover:text-primary transition">Create Profile</a></li>
                            <li><a href="#browse-jobs" className="hover:text-primary transition">Browse Jobs</a></li>
                            <li><a href="#success-stories" className="hover:text-primary transition">Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">For Recruiters</h4>
                        <ul className="space-y-1">
                            <li><a href="#start-hiring" className="hover:text-primary transition">Start Hiring</a></li>
                            <li><a href="#post-job" className="hover:text-primary transition">Post a Job</a></li>
                            <li><a href="#pricing" className="hover:text-primary transition">Pricing Plans</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Support</h4>
                        <ul className="space-y-1">
                            <li><a href="#help" className="hover:text-primary transition">Help Center</a></li>
                            <li><a href="#community" className="hover:text-primary transition">Community</a></li>
                            <li><a href="#contact" className="hover:text-primary transition">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-zinc-800 pt-6 text-sm">
                    <div className="mb-2 md:mb-0">© 2025 Skillexer. All rights reserved.</div>
                    <div className="space-x-4">
                        <a href="#privacy" className="hover:text-primary transition">Privacy Policy</a>
                        <a href="#terms" className="hover:text-primary transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;