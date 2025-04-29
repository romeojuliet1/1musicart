
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const getBlogPostById = (id: string) => {
  const blogPosts = {
    "7": {
      title: "Professional PA System Rental in Italy: What You Need to Know",
      date: "April 25, 2023",
      readTime: "7 min read",
      author: "Elena Romano",
      category: "Equipment Rental",
      imageSrc: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80",
      content: [
        {
          type: "paragraph",
          text: "When organizing an event in Italy that requires high-quality sound, renting a professional PA system is often more practical and cost-effective than purchasing equipment. Whether you're planning a corporate conference, a wedding reception, or a musical performance, having the right sound equipment is crucial for your event's success."
        },
        {
          type: "heading",
          text: "Types of PA Systems Available in Italy"
        },
        {
          type: "paragraph",
          text: "Italy offers a range of PA rental options to suit different event needs. These typically include:"
        },
        {
          type: "list",
          items: [
            "Small portable systems (suitable for presentations and small gatherings up to 50 people)",
            "Medium-sized systems (ideal for corporate events and small concerts of 50-200 people)",
            "Large line array systems (perfect for concerts and large-scale events of 200+ attendees)",
            "Complete DJ setups with mixing consoles and monitors",
            "Specialized systems for theater productions and conferences"
          ]
        },
        {
          type: "heading",
          text: "Factors to Consider When Renting a PA System"
        },
        {
          type: "paragraph",
          text: "Before renting sound equipment in Italy, consider these important factors to ensure you get the right setup for your event:"
        },
        {
          type: "list",
          items: [
            "Venue size and acoustics: Different venues require different types and power levels of sound systems",
            "Indoor vs. outdoor events: Outdoor events generally need more powerful systems and weather protection",
            "Type of event: Music performances need different equipment than speeches or presentations",
            "Technical support: Determine whether you need technicians to set up and operate the equipment",
            "Rental duration: Most companies offer better rates for multi-day rentals",
            "Power requirements: Ensure your venue can support the electrical needs of the system"
          ]
        },
        {
          type: "heading",
          text: "Average Costs for PA Rental in Italy"
        },
        {
          type: "paragraph",
          text: "PA system rental costs in Italy vary based on equipment quality, size, and whether technical support is included. Here's a general pricing overview:"
        },
        {
          type: "list",
          items: [
            "Small PA systems: €150-300 per day",
            "Medium PA systems: €350-700 per day",
            "Large concert-grade systems: €800-2,000+ per day",
            "Sound technician services: €200-400 per day additional",
            "Transport, setup, and teardown: Often charged separately at €100-300 depending on distance and complexity"
          ]
        },
        {
          type: "paragraph",
          text: "Many rental companies offer package deals for multiple days or when combining different types of equipment, which can significantly reduce the overall cost."
        },
        {
          type: "heading",
          text: "Booking Process and Timeline"
        },
        {
          type: "paragraph",
          text: "For the best experience when renting PA equipment in Italy, follow these recommended steps:"
        },
        {
          type: "list",
          items: [
            "Book 1-3 months in advance for large events, especially during the busy summer season",
            "Request detailed quotes from multiple rental companies",
            "Arrange a site visit with the rental company if possible",
            "Confirm power and space requirements with your venue",
            "Schedule delivery and setup at least several hours before your event begins",
            "Consider insurance for expensive equipment rentals"
          ]
        },
        {
          type: "quote",
          text: "Always test all equipment thoroughly during setup. It's much easier to fix issues before your guests arrive than during your event.",
          author: "Event Production Manager"
        },
        {
          type: "heading",
          text: "Leading PA Rental Companies in Italy"
        },
        {
          type: "paragraph",
          text: "Italy has several reputable companies specializing in professional audio equipment rental. Most major cities like Rome, Milan, Florence, and Naples have local providers with high-quality inventory. The best companies offer comprehensive services including delivery, setup, technical support, and pickup."
        },
        {
          type: "paragraph",
          text: "When selecting a rental company, check their reviews, ask for references, and inquire about their backup equipment policies in case of technical failures."
        },
        {
          type: "paragraph",
          text: "With proper planning and the right equipment partner, renting a PA system in Italy can be a seamless process that ensures your event sounds as good as it looks."
        }
      ],
      relatedPosts: []
    }
  };
  
  return blogPosts[id as keyof typeof blogPosts] || null;
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getBlogPostById(id) : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!post) {
    return (
      <div className="pt-32 pb-16 px-6 md:px-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Blog post not found</h1>
        <Link to="/blog" className="text-psyco-green-DEFAULT hover:text-psyco-green-light">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-psyco-green-DEFAULT hover:text-psyco-green-light transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all articles
        </Link>
      </div>
      
      {/* Article header */}
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-psyco-green-DEFAULT px-3 py-1 text-xs font-medium text-white rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 md:gap-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-10 rounded-lg overflow-hidden">
          <img 
            src={post.imageSrc} 
            alt={post.title} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Article content */}
        <div className="prose prose-invert max-w-none">
          {post.content.map((section, index) => {
            if (section.type === "paragraph") {
              return <p key={index} className="text-gray-300 mb-6">{section.text}</p>;
            } else if (section.type === "heading") {
              return <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">{section.text}</h2>;
            } else if (section.type === "list") {
              return (
                <ul key={index} className="list-disc pl-6 mb-6 text-gray-300">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-2">{item}</li>
                  ))}
                </ul>
              );
            } else if (section.type === "quote") {
              return (
                <blockquote key={index} className="border-l-4 border-psyco-green-DEFAULT pl-4 italic my-6">
                  <p className="text-gray-300 mb-2">"{section.text}"</p>
                  {section.author && (
                    <footer className="text-sm text-gray-400">— {section.author}</footer>
                  )}
                </blockquote>
              );
            }
            return null;
          })}
        </div>
        
        {/* Share buttons */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex items-center">
            <span className="text-gray-400 mr-4">Share this article:</span>
            <div className="flex space-x-3">
              <button className="text-gray-400 hover:text-psyco-green-DEFAULT transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
