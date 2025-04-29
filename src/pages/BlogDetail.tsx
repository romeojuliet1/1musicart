
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const getBlogPostById = (id: string) => {
  const blogPosts = {
    "6": {
      title: "The Technical Rider: What Event Organizers Need to Know",
      date: "June 30, 2023",
      readTime: "9 min read",
      author: "Michael Stevens",
      category: "Technical",
      imageSrc: "https://images.unsplash.com/photo-1608749333098-a1783ca4b4bf?auto=format&fit=crop&q=80",
      content: [
        {
          type: "paragraph",
          text: "A technical rider is one of the most important documents in event production, yet it's often misunderstood or overlooked by new event organizers. This document outlines the technical requirements that performers need to deliver their show successfully."
        },
        {
          type: "heading",
          text: "What is a Technical Rider?"
        },
        {
          type: "paragraph",
          text: "A technical rider is essentially a set of requirements and specifications that performers provide to venue operators and event organizers. It details everything from the audio equipment needed to stage dimensions, lighting requirements, and power specifications."
        },
        {
          type: "heading",
          text: "Key Components of a Technical Rider"
        },
        {
          type: "list",
          items: [
            "Audio requirements: Microphones, monitors, mixing console specifications",
            "Lighting needs: Types of fixtures, control systems, special effects",
            "Stage requirements: Dimensions, layout, backstage access",
            "Power specifications: Voltage requirements, number of circuits needed",
            "Staff requirements: Sound engineers, lighting technicians, stage hands",
            "Schedule information: Load-in, soundcheck, and performance times"
          ]
        },
        {
          type: "paragraph",
          text: "Understanding and fulfilling these requirements is crucial for the success of any event. Without proper technical support, even the most talented performers cannot deliver their best show."
        },
        {
          type: "heading",
          text: "Common Challenges and Solutions"
        },
        {
          type: "paragraph",
          text: "Many venues struggle with accommodating every aspect of a technical rider. Here are some common challenges and practical solutions:"
        },
        {
          type: "list",
          items: [
            "Equipment limitations: Rent additional gear or negotiate alternatives with the performer",
            "Space constraints: Optimize the layout or consider a different venue if requirements are inflexible",
            "Budget restrictions: Prioritize essential requirements and discuss alternatives for non-critical items",
            "Technical expertise: Hire specialized staff for the event or invest in training your team"
          ]
        },
        {
          type: "heading",
          text: "Preparing Your Venue for Technical Riders"
        },
        {
          type: "paragraph",
          text: "If you manage a venue or frequently organize events, there are several steps you can take to better accommodate technical riders:"
        },
        {
          type: "list",
          items: [
            "Maintain an updated inventory of available equipment",
            "Create detailed venue specifications sheets including dimensions, power capabilities, and existing audio/visual infrastructure",
            "Establish relationships with rental companies for specialized equipment",
            "Build a network of qualified technicians who can be called on for specific events",
            "Develop a standardized process for reviewing and responding to technical riders"
          ]
        },
        {
          type: "paragraph",
          text: "By taking a proactive approach to technical riders, you can ensure smoother events with fewer last-minute complications."
        },
        {
          type: "quote",
          text: "A well-prepared venue that can accommodate technical riders without friction is worth its weight in gold. Artists remember the venues where they had a great experience, and they'll want to return.",
          author: "Concert Production Manager"
        },
        {
          type: "paragraph",
          text: "Whether you're an event organizer, venue manager, or performer, understanding the importance of the technical rider is essential for successful events. Taking the time to properly address technical requirements will result in better performances, happier artists, and more satisfied audiences."
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
