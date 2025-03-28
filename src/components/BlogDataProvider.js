import React from 'react';
import { useLocation, Redirect } from '@docusaurus/router';

// This component just redirects back to home while making the blog data available
export default function BlogDataProvider(props) {
    const location = useLocation();

    // Store the blog data in window for access by other components
    if (typeof window !== 'undefined') {
        window.blogData = {
            metadata: props.homePageBlogMetadata,
            recentPosts: props.recentPosts
        };
    }

    // Redirect to home if accessed directly
    if (location.pathname === '/blog-data') {
        return <Redirect to="/" />;
    }

    return null;
}
