"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductBanner from "@/app/components/common/ProductBanner";
import ProductInnerPageLayout, {
  ProductDetail,
} from "@/app/components/common/ProductInnerPageLayout";
import { getProductBySlug } from "@/app/utils/product";

interface ProductBannerData {
  title?: string;
  title_highlight?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  cta_text?: string;
  cta_link?: string;
  image_desktop?: string;
  image_desktop_url?: string;
  image_mobile?: string;
  image_mobile_url?: string;
}

interface ProductApiResponse extends ProductDetail {
  banner?: ProductBannerData;
  banner_image_desktop?: string;
  banner_image_desktop_url?: string;
  banner_image_mobile?: string;
  banner_image_mobile_url?: string;
  banner_title?: string;
  banner_title_highlight?: string;
  banner_subtitle?: string;
  banner_description?: string;
  banner_button_text?: string;
  banner_button_link?: string;
}

export default function ProductSingleClient() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [product, setProduct] = useState<ProductApiResponse | null>(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const fetchProduct = async () => {
      try {
        const res = await getProductBySlug(slug);
        if (isMounted) {
          setProduct(res?.data ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        if (isMounted) {
          setError("Product not found.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-[#f8f8f8] py-[120px]">
        <div className="site-container animate-pulse space-y-8">
          <div className="h-[360px] bg-stone-200 rounded-[25px]" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 h-[400px] bg-white rounded-[25px]" />
            <div className="lg:col-span-4 h-[260px] bg-white rounded-[25px]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="w-full min-h-screen bg-[#f8f8f8] py-[160px]">
        <div className="site-container text-center">
          <h1 className="text-[28px] font-medium text-stone-900 font-[var(--font-dm-sans)]">
            {error || "Product not found."}
          </h1>
        </div>
      </main>
    );
  }

  const banner = product.banner;
  const bgImage =
    banner?.image_desktop_url ||
    banner?.image_desktop ||
    product.banner_image_desktop_url ||
    product.banner_image_desktop ||
    product.featured_image_url ||
    "";
  const mobileBgImage =
    banner?.image_mobile_url ||
    banner?.image_mobile ||
    product.banner_image_mobile_url ||
    product.banner_image_mobile ||
    bgImage;

  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage={bgImage}
        mobileBgImage={mobileBgImage}
        titlePrefix={`${banner?.title || product.banner_title || product.name}\n`}
        titleHighlight={
          banner?.title_highlight || product.banner_title_highlight || ""
        }
        subtitle={banner?.subtitle || product.banner_subtitle || ""}
        description={
          banner?.description ||
          product.banner_description ||
          product.short_description ||
          ""
        }
        buttonText={
          banner?.button_text ||
          banner?.cta_text ||
          product.banner_button_text ||
          "Call Now"
        }
        buttonLink={
          banner?.button_link ||
          banner?.cta_link ||
          product.banner_button_link ||
          "/contact-us"
        }
      />
      <ProductInnerPageLayout product={product} currentSlug={slug} />
    </main>
  );
}
