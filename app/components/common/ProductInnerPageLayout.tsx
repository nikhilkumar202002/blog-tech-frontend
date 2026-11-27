"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenu, getProducts } from "@/app/utils/product";

export interface ProductMenuItem {
  id?: string | number;
  name?: string;
  label?: string;
  slug?: string;
  href?: string;
  url?: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  url?: string;
  short_description?: string | null;
  description?: string | null;
  content?: string | null;
  features?: string[];
  featured_image?: string | null;
  featured_image_url?: string | null;
  gallery_images?: string[];
  gallery_image_urls?: string[];
}

export interface ProductInnerPageLayoutProps {
  children?: React.ReactNode;
  product?: ProductDetail | null;
  title?: string;
  subtitle?: string;
  menuItems?: ProductMenuItem[];
  currentSlug?: string;
  sidebarTitle?: string;
  className?: string;
}

const ProductInnerPageLayout: React.FC<ProductInnerPageLayoutProps> = ({
  children,
  product,
  title,
  subtitle,
  menuItems,
  currentSlug,
  sidebarTitle = "Other Products",
  className = "",
}) => {
  const pathname = usePathname();
  const [fetchedProducts, setFetchedProducts] = useState<ProductMenuItem[]>([]);
  const [loading, setLoading] = useState(!menuItems);

  useEffect(() => {
    if (menuItems) return;

    let isMounted = true;
    const fetchOtherProducts = async () => {
      try {
        const res = await getProducts();
        let items: ProductMenuItem[] = Array.isArray(res?.data) ? res.data : [];

        if (items.length === 0) {
          const menuRes = await getMenu();
          items = Array.isArray(menuRes?.data?.products)
            ? menuRes.data.products
            : Array.isArray(menuRes?.data)
              ? menuRes.data
              : [];
        }

        if (isMounted) {
          setFetchedProducts(items);
        }
      } catch (error) {
        console.error("Failed to fetch product menu:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOtherProducts();
    return () => {
      isMounted = false;
    };
  }, [menuItems]);

  const products = menuItems ?? fetchedProducts;
  const isLoading = menuItems ? false : loading;
  const displayTitle = title ?? product?.name;
  const displaySubtitle = subtitle ?? product?.short_description ?? undefined;
  const featuredImage = product?.featured_image_url || product?.featured_image;
  const galleryImages =
    product?.gallery_image_urls ?? product?.gallery_images ?? [];
  const activeSlug = currentSlug ?? product?.slug;
  const otherProducts = products.filter(
    (item) => !activeSlug || item.slug !== activeSlug
  );

  return (
    <section
      className={`w-full py-[80px] lg:py-[120px] bg-[#f8f8f8] text-stone-900 ${className}`}
    >
      <div className="site-container">
        {(displayTitle || displaySubtitle) && (
          <div className="mb-10 lg:mb-12">
            {displayTitle && (
              <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-medium tracking-tight text-stone-900 leading-tight font-[var(--font-dm-sans)]">
                {displayTitle}
              </h1>
            )}
            {displaySubtitle && (
              <p className="mt-3 text-[16px] sm:text-[18px] text-stone-500 max-w-2xl leading-relaxed font-[var(--font-inter)]">
                {displaySubtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[32px] items-start">
          {/* Left Side: Main Product Content */}
          <div className="lg:col-span-8 bg-white rounded-[25px] p-6 sm:p-8 lg:p-10 space-y-8">
            {featuredImage && (
              <div className="w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-stone-100">
                <img
                  src={featuredImage}
                  alt={displayTitle || "Product image"}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {product?.content && (
              <div
                className="text-stone-600 font-[var(--font-inter)] leading-relaxed space-y-4 [&_h1]:text-[28px] [&_h1]:font-medium [&_h1]:text-stone-900 [&_h1]:font-[var(--font-dm-sans)] [&_h2]:text-[22px] [&_h2]:font-medium [&_h2]:text-stone-900 [&_h2]:mt-6 [&_h2]:font-[var(--font-dm-sans)] [&_h3]:text-[18px] [&_h3]:font-medium [&_h3]:text-stone-900 [&_h3]:mt-4 [&_h3]:font-[var(--font-dm-sans)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-stone-900"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            )}

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                {galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/3] rounded-[14px] overflow-hidden bg-stone-100"
                  >
                    <img
                      src={imgUrl}
                      alt={`${displayTitle || "Product"} gallery ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            {children}
          </div>

          {/* Right Side: Other Products Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-[25px] p-6">
              <h2 className="text-[18px] font-medium text-stone-900 mb-4 pb-3 border-b border-stone-100 font-[var(--font-dm-sans)]">
                {sidebarTitle}
              </h2>

              {isLoading ? (
                <div className="space-y-2.5 animate-pulse">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="h-10 bg-stone-100 rounded-[14px]" />
                  ))}
                </div>
              ) : otherProducts.length > 0 ? (
                <nav aria-label={sidebarTitle} className="flex flex-col gap-1.5">
                  {otherProducts.map((item, idx) => {
                    const label = item.label || item.name || "Product";
                    const href = item.slug
                      ? `/our-products/${item.slug}`
                      : item.href || item.url || "#";
                    const isActive =
                      (activeSlug && item.slug === activeSlug) ||
                      (href !== "#" && pathname?.startsWith(href));

                    return (
                      <Link
                        key={item.id ?? item.slug ?? idx}
                        href={href}
                        className={`flex items-center justify-between px-4 py-3 rounded-[14px] text-[15px] font-medium transition-colors duration-200 font-[var(--font-dm-sans)] ${
                          isActive
                            ? "bg-[#FAF2E4] text-[#A44B03]"
                            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                        }`}
                      >
                        <span>{label}</span>
                        <span className="text-[14px] opacity-60">→</span>
                      </Link>
                    );
                  })}
                </nav>
              ) : (
                <p className="text-[14px] text-stone-400 font-[var(--font-inter)]">
                  No other products available.
                </p>
              )}
            </div>

            {/* Contact CTA Card */}
            <div className="bg-white rounded-[25px] p-6 border border-stone-100">
           
              <h2 className="text-[20px] font-medium text-stone-900 leading-snug mb-2 font-[var(--font-dm-sans)]">
                Ready to Transform Your Business Operations?
              </h2>
              <p className="text-[14px] text-stone-500 leading-relaxed mb-5 font-[var(--font-inter)]">
                Speak directly with BLOGTECH Software experts for a personalized
                demo, pricing details, and tailored implementation of{" "}
                <strong className="font-medium text-stone-700">
                  {displayTitle || "our enterprise software solutions"}
                </strong>{" "}
                for your showroom, multi-branch inventory, or workforce workflow.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/917994455922?text=${encodeURIComponent(
                    `Hi BLOGTECH team, I would like to know more about ${
                      displayTitle || "your software products"
                    }.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#A44B03] hover:bg-[#7A3602] text-white text-[14px] font-medium transition-colors duration-200 font-[var(--font-dm-sans)]"
                >
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:+917994455922"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#FAF2E4] hover:bg-[#A44B03] text-[#A44B03] hover:text-white text-[14px] font-medium transition-colors duration-200 font-[var(--font-dm-sans)]"
                >
                  <span>Call +91 79944 55922</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProductInnerPageLayout;
