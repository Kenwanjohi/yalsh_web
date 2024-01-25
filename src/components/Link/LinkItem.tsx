import React from "react";
import { Box, ListItem, Text, HStack, IconButton, Flex } from "@chakra-ui/react";
import { Copy, Pencil, QrCode, Trash2, BarChart } from "lucide-react";

type LinkType = {
  id: number;
  domain: string;
  url: string;
};

interface LinkItemProps {
  link: LinkType;
}
export const LinkItem: React.FC<LinkItemProps> = ({ link }) => {
  return (
    <ListItem key={link.id} p={4} borderRadius="md" borderWidth="1px">
      <Box>
        <Flex>

        <HStack>
          <Text decoration={'underline'} >
            <strong>Domain:</strong> {link.domain}
          </Text>
          <IconButton
            aria-label="Copy Domain"
            icon={<Copy size={14} />}
            variant={"ghost"}
            size="sm"
          />
        </HStack>
        <HStack ml="auto">
          <Text>10 clicks</Text>
          <BarChart size={16} />
        </HStack>
        </Flex>
        <Text isTruncated>
          <strong>URL:</strong> {link.url} <br />
        </Text>
        <HStack>
          <IconButton
            aria-label="Edit Link"
            icon={<Pencil size={16} />}
            size="sm"
          />
          <IconButton
            aria-label="Delete Link"
            icon={<Trash2 size={16} />}
            size="sm"
          />
          <IconButton
            aria-label="QR Code"
            icon={<QrCode size={16} />}
            size="sm"
          />
        </HStack>
      </Box>
    </ListItem>
  );
};
