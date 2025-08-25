const Footer = () => {
    return (
        <footer className="py-10" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)' }}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--accent-primary)' }}>Skillexer</h3>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Where talent meets opportunity. Skip the resume, show your skills, and get hired for what you can actually build.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">For Students</h4>
                        <ul className="space-y-1">
                            <li><a href="#create-profile" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Create Profile</a></li>
                            <li><a href="#browse-jobs" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Browse Jobs</a></li>
                            <li><a href="#success-stories" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">For Recruiters</h4>
                        <ul className="space-y-1">
                            <li><a href="#start-hiring" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Start Hiring</a></li>
                            <li><a href="#post-job" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Post a Job</a></li>
                            <li><a href="#pricing" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Pricing Plans</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Support</h4>
                        <ul className="space-y-1">
                            <li><a href="#help" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Help Center</a></li>
                            <li><a href="#community" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Community</a></li>
                            <li><a href="#contact" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <div className="mb-2 md:mb-0">© 2025 Skillexer. All rights reserved.</div>
                    <div className="space-x-4">
                        <a href="#privacy" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</a>
                        <a href="#terms" className="hover:underline transition-colors" style={{ color: 'var(--text-secondary)' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;