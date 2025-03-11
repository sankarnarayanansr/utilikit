import { ObjectUtils } from '../../src/datapkg/ObjectUtils';

describe('ObjectUtils', () => {
    describe('deepClone', () => {
        it('should create deep copy of object', () => {
            const original = {
                a: 1,
                b: { c: 2 },
                d: [1, 2, { e: 3 }]
            };
            const clone = ObjectUtils.deepClone(original);
            
            expect(clone).toEqual(original);
            expect(clone).not.toBe(original);
            expect(clone.b).not.toBe(original.b);
            expect(clone.d).not.toBe(original.d);
        });

        it('should handle circular references', () => {
            const original: any = { a: 1 };
            original.self = original;
            
            expect(() => ObjectUtils.deepClone(original)).not.toThrow();
        });
    });

    describe('deepMerge', () => {
        it('should merge objects deeply', () => {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { b: { d: 3 }, e: 4 };
            
            const result = ObjectUtils.deepMerge(obj1, obj2);
            expect(result).toEqual({
                a: 1,
                b: { c: 2, d: 3 },
                e: 4
            });
        });

        it('should handle arrays correctly', () => {
            const obj1 = { a: [1, 2] };
            const obj2 = { a: [3, 4] };
            
            const result = ObjectUtils.deepMerge(obj1, obj2);
            expect(result.a).toEqual([1, 2, 3, 4]);
        });
    });

    describe('hasProperty', () => {
        it('should check for direct properties', () => {
            const obj = { name: 'John', age: 30 };
            
            expect(ObjectUtils.hasProperty(obj, 'name')).toBe(true);
            expect(ObjectUtils.hasProperty(obj, 'address')).toBe(false);
        });

        it('should not detect inherited properties', () => {
            const obj = Object.create({ inherited: true });
            obj.own = true;

            expect(ObjectUtils.hasProperty(obj, 'own')).toBe(true);
            expect(ObjectUtils.hasProperty(obj, 'inherited')).toBe(false);
        });
    });

    describe('mapValues', () => {
        it('should map object values using transform function', () => {
            const obj = { a: 1, b: 2, c: 3 };
            const result = ObjectUtils.mapValues(obj, x => x * 2);
            expect(result).toEqual({ a: 2, b: 4, c: 6 });
        });

        it('should handle complex transformations', () => {
            const obj = { 
                shirt: { price: 20, quantity: 2 },
                pants: { price: 30, quantity: 1 }
            };
            const result = ObjectUtils.mapValues(obj, item => item.price * item.quantity);
            expect(result).toEqual({ shirt: 40, pants: 30 });
        });

        it('should create a new object', () => {
            const obj = { a: 1 };
            const result = ObjectUtils.mapValues(obj, x => x);
            expect(result).not.toBe(obj);
        });
    });
}); 