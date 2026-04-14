import React from "react";
import {
  Box,
  ListItem,
  Text,
  HStack,
  IconButton,
  Flex,
  Link,
} from "@chakra-ui/react";
import { Copy, Pencil, QrCode, Trash2, BarChart } from "lucide-react";
import { toast } from "sonner";

type LinkType = {
  linkId: number;
  url: string;
  key: string;
  clicks: number;
};

interface LinkItemProps {
  link: LinkType;
}
export const LinkItem: React.FC<LinkItemProps> = ({ link }) => {
  const shortUrl = `https://yalsh.com/${link.key}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <ListItem key={link.linkId} p={4} borderRadius="md" borderWidth="1px">
      <Box>
        <Flex justify={'space-between'} flexWrap={'wrap'}>
          <HStack>
            <strong>Short link:</strong>
            <Link href={shortUrl} isExternal>
              yalsh.com/{link.key}
            </Link>
            <IconButton
              aria-label="Copy Link"
              icon={<Copy size={14} />}
              variant={"ghost"}
              size="sm"
              onClick={handleCopy}
            />
          </HStack>
          <HStack>
            <Text>{link.clicks} clicks</Text>
            <BarChart size={16} />
          </HStack>
        </Flex>
        <Flex  >
          <strong>URL:</strong>
          <Text isTruncated ml={2}>
            <Link
              href={link.url}
              isExternal
            >
              {link.url}
            </Link>
          </Text>
        </Flex>
        <HStack mt={2}>
          <IconButton
            aria-label="Edit Link"
            icon={<Pencil size={16} />}
            size="sm"
            isDisabled
          />
          <IconButton
            aria-label="Delete Link"
            icon={<Trash2 size={16} />}
            size="sm"
            isDisabled
          />
          <IconButton
            aria-label="QR Code"
            icon={<QrCode size={16} />}
            size="sm"
            isDisabled
          />
        </HStack>
      </Box>
    </ListItem>
  );
};
