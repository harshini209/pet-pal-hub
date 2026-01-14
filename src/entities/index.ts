/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: behavioralresources
 * Interface for BehavioralResources
 */
export interface BehavioralResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  problemArea?: string;
  /** @wixFieldType text */
  petType?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
  /** @wixFieldType url */
  externalLink?: string;
}


/**
 * Collection ID: communityposts
 * Interface for CommunityPosts
 */
export interface CommunityPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  postContent?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  postImage?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType datetime */
  postedAt?: Date | string;
  /** @wixFieldType text */
  communityType?: string;
  /** @wixFieldType number */
  likesCount?: number;
}


/**
 * Collection ID: petgalleryphotos
 * Interface for PetGalleryPhotos
 */
export interface PetGalleryPhotos {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photoFile?: string;
  /** @wixFieldType text */
  photoTitle?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType text */
  uploaderName?: string;
  /** @wixFieldType text */
  petType?: string;
  /** @wixFieldType datetime */
  uploadDate?: Date | string;
}


/**
 * Collection ID: petprofiles
 * Interface for PetProfiles
 */
export interface PetProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  petName?: string;
  /** @wixFieldType number */
  petAge?: number;
  /** @wixFieldType text */
  petType?: string;
  /** @wixFieldType text */
  petLocation?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType text */
  ownerId?: string;
}


/**
 * Collection ID: pettypecommunities
 * Interface for PetTypeCommunities
 */
export interface PetTypeCommunities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  petTypeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  communityImage?: string;
  /** @wixFieldType number */
  memberCount?: number;
  /** @wixFieldType text */
  rulesAndGuidelines?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: veterinarydirectory
 * Interface for VeterinaryDirectory
 */
export interface VeterinaryDirectory {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  vetName?: string;
  /** @wixFieldType text */
  specialty?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType url */
  onlineConsultationUrl?: string;
  /** @wixFieldType text */
  bio?: string;
}
