"use client";

import { forwardRef } from 'react';
import NextLink from "next/link";

const LinkBehavior = forwardRef(function LinkBehavior(props: any, ref) {
  const { href, ...other } = props;
  return <NextLink ref={ref} href={href} {...other} />;
});

export default LinkBehavior;