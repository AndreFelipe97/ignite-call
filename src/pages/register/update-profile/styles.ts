import { Box, Text, styled } from "@ignite-ui/react";

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: "flex",
  flexDirection: "column",
  gap: "$4",

  lable: {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
  },

  textarea: {
    width: "100%",
  }
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
