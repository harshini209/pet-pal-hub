import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts, PetTypeCommunities } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';
import { Heart, MessageCircle, Send, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunityFeedPage() {
  const { communityId } = useParams();
  const { member } = useMember();
  const [community, setCommunity] = useState<PetTypeCommunities | null>(null);
  const [posts, setPosts] = useState<CommunityPosts[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunityData();
  }, [communityId]);

  const loadCommunityData = async () => {
    if (!communityId) return;

    try {
      const communityData = await BaseCrudService.getById<PetTypeCommunities>('pettypecommunities', communityId);
      setCommunity(communityData);

      const { items } = await BaseCrudService.getAll<CommunityPosts>('communityposts');
      const communityPosts = items
        .filter((post) => post.communityType === communityData.petTypeName)
        .sort((a, b) => {
          const dateA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
          const dateB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
          return dateB - dateA;
        });
      setPosts(communityPosts);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !member || !community) return;

    try {
      await BaseCrudService.create('communityposts', {
        _id: crypto.randomUUID(),
        postContent: newPost,
        authorName: member.profile?.nickname || member.contact?.firstName || 'Anonymous',
        communityType: community.petTypeName,
        postedAt: new Date().toISOString(),
        likesCount: 0,
      });
      setNewPost('');
      await loadCommunityData();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (post: CommunityPosts) => {
    try {
      await BaseCrudService.update<CommunityPosts>('communityposts', {
        _id: post._id,
        likesCount: (post.likesCount || 0) + 1,
      });
      await loadCommunityData();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="font-paragraph text-lg text-foreground/70">Community not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          {/* Community Header */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl lg:text-6xl text-foreground mb-4"
            >
              {community.petTypeName} Community
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-lg text-foreground/80 mb-6"
            >
              {community.description}
            </motion.p>
            {community.rulesAndGuidelines && (
              <Card className="bg-secondary border-none rounded-2xl p-6">
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Community Guidelines</h3>
                <p className="font-paragraph text-base text-secondary-foreground/80">
                  {community.rulesAndGuidelines}
                </p>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <Card className="bg-secondary border-none rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl text-secondary-foreground mb-4">Share with the community</h3>
                  <Textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="mb-4 bg-background border-secondary-foreground/20 text-foreground min-h-[120px]"
                  />
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-secondary border-none rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-secondary-foreground/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-paragraph text-base font-semibold text-secondary-foreground">
                            {post.authorName}
                          </h4>
                          <p className="font-paragraph text-sm text-secondary-foreground/60">
                            {post.postedAt ? new Date(post.postedAt).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                      <p className="font-paragraph text-base text-secondary-foreground mb-4">{post.postContent}</p>
                      {post.postImage && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <Image
                            src={post.postImage}
                            alt="Post image"
                            width={800}
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLikePost(post)}
                          className="flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span className="font-paragraph text-sm">{post.likesCount || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-paragraph text-sm">Comment</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {posts.length === 0 && (
                <Card className="bg-secondary border-none rounded-2xl">
                  <CardContent className="p-12 text-center">
                    <p className="font-paragraph text-base text-secondary-foreground/70">
                      No posts yet. Be the first to share something!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-secondary border-none rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl text-secondary-foreground mb-4">Community Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-secondary-foreground/70">Members</span>
                      <span className="font-paragraph text-base font-semibold text-secondary-foreground">
                        {community.memberCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-secondary-foreground/70">Posts</span>
                      <span className="font-paragraph text-base font-semibold text-secondary-foreground">
                        {posts.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
